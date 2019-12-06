//
//  RegisterPersonalInfoViewController.swift
//  scrum-ios
//
//  Created by Matias on 26/05/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import UIKit
import Firebase
import FirebaseAuth
import GoogleSignIn
import FirebaseFirestore
import SwiftyJSON
import RealmSwift

enum PickerViewType {
    case gender
    case gameTasteLevel
    case gameTimeDedication
}

class RegisterPersonalInfoViewController: UIViewController, UITextFieldDelegate, Storyboarded, UIPickerViewDelegate, UIPickerViewDataSource {
    
    weak var coordinator: CredentialsCoordinator?
    var credentials: TemporalCredentials?
    
    @IBOutlet weak var nameTextField: FloatLabelTextField!
    @IBOutlet weak var ageTextField: FloatLabelTextField!
    @IBOutlet weak var genderTextField: FloatLabelTextField!
    @IBOutlet weak var professionTextField: FloatLabelTextField!
    @IBOutlet weak var cityTextField: FloatLabelTextField!
    @IBOutlet weak var stateTextField: FloatLabelTextField!
    @IBOutlet weak var countryTextField: FloatLabelTextField!
    @IBOutlet weak var gamesTasteLevelTextField: FloatLabelTextField!
    @IBOutlet weak var gamesTimeTextField: FloatLabelTextField!

    let genderPicker = UIPickerView()
    let gamesDataPicker = UIPickerView()

    var allTextFields = [UITextField]()
    var pickerType: PickerViewType = .gender
    
    let genders = ["Masculino", "Femenino"]
    let tasteLevels = ["Nada", "Poco", "Le da igual", "Mucho", "Fanático"]
    
    private let db = Firestore.firestore()

    override func viewDidLoad() {
        super.viewDidLoad()
        nameTextField.delegate = self
        ageTextField.delegate = self
        professionTextField.delegate = self
        genderTextField.delegate = self
        cityTextField.delegate = self
        stateTextField.delegate = self
        countryTextField.delegate = self
        gamesTasteLevelTextField.delegate = self
        gamesTimeTextField.delegate = self
        
        genderPicker.delegate = self
        genderPicker.dataSource = self
        gamesDataPicker.delegate = self
        gamesDataPicker.dataSource = self
        
        genderTextField.inputView = genderPicker
        gamesTimeTextField.inputView = gamesDataPicker
        gamesTasteLevelTextField.inputView = gamesDataPicker
        
        setTapGesture()
        
        nameTextField.becomeFirstResponder()
        
        
    }
        override var preferredStatusBarStyle: UIStatusBarStyle {
        return .lightContent
    }

    
    @IBAction func finish(_ sender: Any) {
        
        guard let name = nameTextField.text else { return }
        
        guard let age = ageTextField.text else  { return }
        
        guard let profession = professionTextField.text else  { return }
        
        guard let gender = genderTextField.text else  { return }
        guard let city = cityTextField.text else  { return }
        guard let state = stateTextField.text else  { return }
        guard let country = countryTextField.text else  { return }
        guard let gameTaste = gamesTasteLevelTextField.text else  { return }
        guard let gameTime = gamesTimeTextField.text else  { return }

        guard let credentials = credentials else { return }

        
        if !name.isEmpty && !age.isEmpty && !profession.isEmpty && !gender.isEmpty && !city.isEmpty && !state.isEmpty && !country.isEmpty && !gameTaste.isEmpty && !gameTime.isEmpty {
            
            
            let newUserData: [String: Any] = [
                "uid": credentials.uuid,
                "name": name,
                "age": age,
                "gender": gender,
                "city": city,
                "state": state,
                "country": country,
                "profession": profession,
                "gameTasteLevel": gameTaste,
                "gameTimeLevel": gameTime,
                "mail": credentials.mail
            ]
            
            // Create user in local DB
            RealmService.saveUser(with: newUserData)
            
            
            // Create progress document in Firestore/LocalDB
            UserLevelsService.createUserDocument(mail: credentials.mail, userData: newUserData, completionHandler: { (error) in
                if let err = error {
                    self.showErrorMessageAlert(err)
                }
                else {
                    self.continueToMain()
                }
            })

            
            
        }
        else {
            let alertController = UIAlertController(title: "Error", message: "Faltan datos", preferredStyle: .alert)
            let defaultAction = UIAlertAction(title: "OK", style: .cancel, handler: nil)
            
            alertController.addAction(defaultAction)
            self.present(alertController, animated: true, completion: nil)

        }
    }
    
    @IBAction func back(_ sender: Any) {
        coordinator?.back()
    }
    
    @objc private func continueToMain() {
//        googleSigninIn = false
        coordinator?.didFinishAuthentication()
    }
    
    func textFieldDidBeginEditing(_ textField: UITextField) {
        if textField == genderTextField {
            pickerType = .gender
        }
        else if textField == gamesTasteLevelTextField {
            pickerType = .gameTasteLevel

        }
        else if textField == gamesTimeTextField {
            pickerType = .gameTimeDedication
        }
    }
    func textFieldDidEndEditing(_ textField: UITextField) {
        genderPicker.reloadInputViews()
        
        textField.resignFirstResponder()
        self.view.endEditing(true)

    }
    
    fileprivate func setTapGesture() {
        let tap = UITapGestureRecognizer(target: self, action: #selector(containerViewTap))
        self.view.addGestureRecognizer(tap)
    }

    @objc func containerViewTap(){
        nameTextField.resignFirstResponder()
        ageTextField.resignFirstResponder()
        professionTextField.resignFirstResponder()
        genderTextField.resignFirstResponder()
        cityTextField.resignFirstResponder()
        stateTextField.resignFirstResponder()
        countryTextField.resignFirstResponder()
        gamesTasteLevelTextField.resignFirstResponder()
        gamesTimeTextField.resignFirstResponder()
    }
    
    
    fileprivate func showErrorMessageAlert(_ err: Error) {
        let alertController = UIAlertController(title: "Error", message: err.localizedDescription, preferredStyle: .alert)
        let defaultAction = UIAlertAction(title: "OK", style: .cancel, handler: nil)
        
        alertController.addAction(defaultAction)
        self.present(alertController, animated: true, completion: nil)
    }
    
    
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    func pickerView( _ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        
        return pickerView == genderPicker ? genders.count : tasteLevels.count
    }
    
    func pickerView( _ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return pickerView == genderPicker ? genders[row] : tasteLevels[row]
    }
    
    func pickerView( _ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        switch pickerType {
        case .gender:
            genderTextField.text = genders[row]
        case .gameTasteLevel:
            gamesTasteLevelTextField.text = tasteLevels[row]
        case .gameTimeDedication:
            gamesTimeTextField.text = tasteLevels[row]
        }
    }
}
