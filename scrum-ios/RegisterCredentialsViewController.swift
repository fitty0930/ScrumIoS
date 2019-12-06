//
//  RegisterCredentialsViewController.swift
//  scrum-ios
//
//  Created by Matias on 26/05/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import UIKit
import Firebase
import GoogleSignIn

class RegisterCredentialsViewController: UIViewController, UITextFieldDelegate, Storyboarded {

    weak var coordinator: CredentialsCoordinator?

    @IBOutlet weak var passwordTextField: FloatLabelTextField!
    @IBOutlet weak var mailTextField: FloatLabelTextField!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        mailTextField.delegate = self
        passwordTextField.delegate = self
    }

    override var preferredStatusBarStyle: UIStatusBarStyle {
        return .lightContent
    }


    @IBAction func next(_ sender: Any) {
        
        guard let mail = mailTextField.text else { return }
        
        guard let pass = passwordTextField.text else  { return }
        
        if !isMailValid(mail) {
            presentErrorAlertView(with: "El correo electrónico no es válido.")
            return
        }
        
        if !isPasswordValid(pass) {
            presentErrorAlertView(with: "La contraseña no es válida. Debe tener al menos 6 caracteres.")
            return
        }
        
        Auth.auth().createUser(withEmail: mail, password: pass) { (result, error) in
            
            if error == nil {
                
                let credentials = TemporalCredentials.init(mail: mail, uuid: result?.user.uid ?? "")
                self.coordinator?.addPersonalInformation(with: credentials)
                
            }
            else{
                self.presentErrorAlertView(with: error?.localizedDescription ?? "Error desconocido")
                return
            }
        }
    }
        
        
    @IBAction func back(_ sender: Any) {
        coordinator?.back()
    }
    
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        if textField.tag == 0 {
            passwordTextField.becomeFirstResponder()
        }
        else {
            textField.resignFirstResponder()
        }
        return true
    }
    
    
    private func isPasswordValid(_ pass: String) -> Bool {
        return pass.count > 5
    }

    
    private func isMailValid(_ mail: String) -> Bool {
        return !mail.isEmpty && isValidMailExpression(emailStr: mail)
    }
        
    private func isValidMailExpression(emailStr: String) -> Bool {
        let emailRegEx = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"
        
        let emailPred = NSPredicate(format:"SELF MATCHES %@", emailRegEx)
        return emailPred.evaluate(with: emailStr)
    }

    private func presentErrorAlertView(with message: String) {
        let alertController = UIAlertController(title: "Error", message: message, preferredStyle: .alert)
        let defaultAction = UIAlertAction(title: "Aceptar", style: .cancel, handler: nil)
        
        alertController.addAction(defaultAction)
        self.present(alertController, animated: true, completion: nil)
    }
    
}

struct TemporalCredentials {

    var mail: String
    var uuid: String

}


