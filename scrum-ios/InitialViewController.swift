//
//  InitialViewController.swift
//  scrum-ios
//
//  Created by Matias on 13/01/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import UIKit
import FirebaseAuth
import Firebase
import GoogleSignIn
import RealmSwift

class InitialViewController: UIViewController, Storyboarded {

    @IBOutlet weak var passwordTextField: FloatLabelTextField!
    @IBOutlet weak var mailTextField: FloatLabelTextField!
    @IBOutlet weak var createAccountButton: GradientButton!
    weak var coordinator: CredentialsCoordinator?
    
    override func viewDidLoad() {
        createAccountButton.setBorder(width: 2, color: UIColor(red:0.72, green:0.24, blue:0.65, alpha:1.0).cgColor)
        createAccountButton.setTitleColor(UIColor(red:0.72, green:0.24, blue:0.65, alpha:1.0), for: .normal)
    }
    
    @IBAction func logIn(_ sender: Any) {
        
        if (mailTextField.text != "" && passwordTextField.text != "") {
            
            Auth.auth().signIn(withEmail: mailTextField.text!, password: passwordTextField.text!) { (user, error) in
                
                if let _ = user {
                    
                    
                    // TODO! Levantar info de los progress de Firestore y guardarla en realm.
                    
                    
                    
                    UserLevelsService.getUser(mail: self.mailTextField.text!, completionHandler: { (error, user) in
                        
                        if error != nil {
                            UserLevelsService.getProgressesFor(userMail: (user?.mail)!, completionHandler: { (error) in
                                if error != nil {
                                    RealmService.saveUser(with: user!)
                                    
                                }
                            })
                            self.coordinator?.didFinishAuthentication()
                        }
                        else {
                            //error tratando de obtener al user, ir igual al main  pero con error
                            self.coordinator?.didFinishAuthentication()
                        }
                    })
                }
                else {
                    print(error)
                }
                
            }
        }

    }
    
    @IBAction func register(_ sender: Any) {
        coordinator?.register()
    }
}


