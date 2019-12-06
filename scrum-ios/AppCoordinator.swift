//
//  AppCoordinator.swift
//  scrum-ios
//
//  Created by Matias on 10/03/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import UIKit
import Firebase
import RealmSwift

class AppCoordinator: NSObject, Coordinator, UINavigationControllerDelegate {
    
    var childCoordinators = [Coordinator]()
    var navigationController: UINavigationController
    
    init(navigationController: UINavigationController) {
        self.navigationController = navigationController
    }
    
    fileprivate func showRealmFileInConsole() {
        print()
        print("Realm file location: ", Realm.Configuration.defaultConfiguration.fileURL!)
        print()
    }
    
    func start() {
        
        navigationController.delegate = self
        showRealmFileInConsole()
        if let _ = Auth.auth().currentUser {
            showLevels()
        }
        else {
            askForCredentials()
        }
        if let file = Realm.Configuration.defaultConfiguration.fileURL {
            print("Realm Configuration file: ", file)
        }
    }
    
    func askForCredentials() {
        let child = CredentialsCoordinator.init(navigationController: navigationController)
        child.parentCoordinator = self
        childCoordinators.append(child)
        child.start()
    }
    
    func showLevels(){
        let child = LevelsCoordinator.init(navigationController: navigationController)
        child.parentCoordinator = self
        childCoordinators.append(child)
        child.start()
    }
    
    
    func didFinishAuthenticating(){
        self.showLevels()
    }
    
    func didFinishDeauthenticating(){
        self.askForCredentials()
    }
}
