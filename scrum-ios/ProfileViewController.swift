//
//  ProfileViewController.swift
//  scrum-ios
//
//  Created by Matias Glessi on 3/14/17.
//  Copyright © 2017 Matias Glessi. All rights reserved.
//

import UIKit
import FirebaseAuth
import BetterSegmentedControl
import RealmSwift
import FirebaseFirestore
import SwiftyJSON

class ProfileViewController: UIViewController, Storyboarded {

    @IBOutlet weak var userGameTimeLabel: UILabel!
    @IBOutlet weak var userGameTasteLabel: UILabel!
    @IBOutlet weak var userGenderLabel: UILabel!
    @IBOutlet weak var userDirectionLabel: UILabel!
    @IBOutlet weak var userAgeLabel: UILabel!
    @IBOutlet weak var userProfessionLabel: UILabel!
    @IBOutlet weak var userNameLabel: UILabel!
    @IBOutlet weak var achivementsView: UIView!
    @IBOutlet weak var informationView: UIView!
    weak var coordinator: LevelsCoordinator?
    @IBOutlet weak var avatarPlaceholder: UIView!
    @IBOutlet weak var avatarImageView: UIImageView!
    @IBOutlet weak var segmentedControl: BetterSegmentedControl!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        updatesStatusBarAppearanceAutomatically = true
        avatarImageView.round()
        avatarPlaceholder.round()
        achivementsView.isHidden = true
        informationView.isHidden = false
        configureSegmentedControl()
        getUserData { (user, error) in
            if error == nil {
                if let user = user {
                    self.setUserData(user)
                }
            }
            else {
                let alertController = UIAlertController(title: "Error", message: "Error obteniendo informacion del usuario. Por favor intente nuevamente mas tarde.", preferredStyle: .alert)
                alertController.addAction(UIAlertAction.init(title: "Aceptar", style: .cancel, handler: { (_) in
                    self.logOut((Any).self)
                }))
                self.present(alertController, animated: true, completion: nil)
            }
        }
    }

    func getUserData(completionHandler: @escaping (User?, Error?) -> Void) {
        
        let realm = try! Realm()
        
        if let user = realm.objects(User.self).first {
            completionHandler(user, nil)
        }
        else {
            completionHandler(nil, NSError.init(domain: "Error obteniendo informacion del usuario", code: 0, userInfo: [:]))
        }
    }
    
    func setUserData(_ user: User){
        
        userGameTimeLabel.text = user.gameTimeLevel
        userGameTasteLabel.text = user.gameTasteLevel
        userGenderLabel.text = user.gender
        userDirectionLabel.text = user.city + ", " + user.state + ", " + user.country
        userAgeLabel.text = "\(user.age)"
        userProfessionLabel.text = user.profession
        userNameLabel.text = user.name
        
        if user.gender == "Femenino" {
            avatarImageView.image = UIImage.init(named: "femaleAvatar")
        }
    }

    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.

    }
    
    private func configureSegmentedControl(){
        
        segmentedControl.segments = LabelSegment.segments(withTitles: ["Información", "Logros"],
                              normalFont: UIFont(name: "GothamRounded-Light", size: 13.0)!,
                              normalTextColor: #colorLiteral(red: 0.6601294875, green: 0.19879511, blue: 0.8791088462, alpha: 1),
                              selectedFont: UIFont(name: "GothamRounded-Medium", size: 13.0)!,
                              selectedTextColor: .white)
        segmentedControl.addTarget(self, action: #selector(ProfileViewController.navigationSegmentedControlValueChanged(_:)), for: .valueChanged)

    }

    @objc func navigationSegmentedControlValueChanged(_ sender: BetterSegmentedControl) {
        if sender.index == 0 {
            achivementsView.isHidden = true
            informationView.isHidden = false
        }
        else {
            achivementsView.isHidden = false
            informationView.isHidden = true
        }
    }

    
    @IBAction func back(_ sender: Any) {
        coordinator?.back()
    }
    
    fileprivate func deleteRealm() {
        let realm = try! Realm()
        try! realm.write {
            realm.deleteAll()
        }
    }
    
    @IBAction func logOut(_ sender: Any) {
        
        print("Tryin to log out user: \(Auth.auth().currentUser?.email ?? "No hay user :(")")
        
        if Auth.auth().currentUser != nil {
            do {
                try Auth.auth().signOut()
                //                let vc = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "InitialViewController")
                UserDefaults.standard.set(nil, forKey: "userLoggedIn")
                deleteRealm()
                self.coordinator?.didFinishDeauthenticating()
                
            } catch let error as NSError {
                print(error.localizedDescription)
            }
        }
    }
    
    @IBAction func exportDatabase(_ sender: Any) {
        
        let fileName = "ScrumGame-Users.csv"
        let path = NSURL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent(fileName)

        generateDumpToString { (result, error) in
            if error == nil { self.generateCSV(from: result, to: path) }
        }
    }
    
    
    func generateDumpToString(completionHandler: @escaping (String, Error?) -> Void) {
    
        let db = Firestore.firestore()
        
        db.collection("users").getDocuments(completion: { (query, error) in
            
            
            
            if let error = error {
                completionHandler("", error)
            }
            else {

                var allUsersData = ConstantsHelper.usersDataCSVHeaders
                for doc in (query?.documents)! {
                    
                    let user = User()
                    user.initFrom(json: JSON.init(doc.data()))
                    let userData = user.generateDataString() + "\n"
                    allUsersData.append(userData)
                }
                completionHandler(allUsersData, nil)
            }
        })
    }
    
    
    
    private func generateCSV(from text: String, to path: URL?){
        
        guard let path = path else { return }
        
        do {
            try text.write(to: path, atomically: true, encoding: String.Encoding.utf8)
            share(path)
        } catch {
            print("Failed to create file")
            print("\(error)")
        }
    }
    
    private func share(_ path: URL){
        let vc = UIActivityViewController(activityItems: [path], applicationActivities: [])
        present(vc, animated: true, completion: nil)
    }
}


