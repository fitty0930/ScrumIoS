//
//  LevelsViewController.swift
//  scrum-ios
//
//  Created by Matias Glessi on 3/14/17.
//  Copyright © 2017 Matias Glessi. All rights reserved.
//

import UIKit
import Bartinter
import Firebase
import FirebaseAuth
import Amplitude_iOS

class LevelsViewController: UIViewController, UICollectionViewDelegate, UICollectionViewDataSource, UICollectionViewDelegateFlowLayout, BaseVMDelegate, Storyboarded {
    
    weak var coordinator: LevelsCoordinator?
    
    func didFinishTask(sender: BaseVM, errorMessage: String?, dataArray: [NSObject]?) {
        print("Levels recieved")
        self.collectionView.reloadData()
        print("should update progress")
    }
        
    let viewModel = LevelVM()
    
//    @IBOutlet weak var userLabel: UILabel!
    @IBOutlet weak var collectionView: UICollectionView!
    @IBOutlet weak var userAvatarImageView: UIImageView!
    @IBOutlet weak var userAvatarPlaceholder: UIButton!
    
    
    
    
    var cellSize: CGSize = CGSize.init()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        updatesStatusBarAppearanceAutomatically = true
        self.viewModel.delegate = self
        self.collectionView.register(UINib(nibName: "BigLevelCollectionViewCell", bundle: nil), forCellWithReuseIdentifier: "BigLevel")
        self.setCellSize()
        self.collectionView.delegate = self
//        self.configureUserInfo()
        self.configureUserAvatar()
        let tapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(goToProfile))
        tapGestureRecognizer.numberOfTapsRequired = 1
        userAvatarPlaceholder.addGestureRecognizer(tapGestureRecognizer)
    }
    
    
    @objc func goToProfile(){
        coordinator?.profile()
    }
    
    private func configureUserAvatar(){
        userAvatarImageView.round()
        userAvatarPlaceholder.round()
    }
    

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.viewModel.getLevels()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
   
    
    func setCellSize(){
        let screenWidth = UIScreen.main.bounds.size.width
        cellSize = CGSize(width: screenWidth, height: 160)
    }
    
    @IBAction func profile(_ sender: Any) {
        coordinator?.profile()
    }
    
    
    
    // MARK: - UICollectionViewDelegateFlowLayout
    func collectionView(_ collectionView: UICollectionView, layout: UICollectionViewLayout, sizeForItemAt sizeForItemAtIndexPath: IndexPath) -> CGSize {
        return cellSize;
    }
    
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return self.viewModel.totalLevels
    }

    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        
        
        Amplitude.instance()?.printEventsCount()
        
        if let cell = collectionView.cellForItem(at: indexPath) as? BigLevelCollectionViewCell {
            
            if cell.isLocked() { return }
            
            
            self.coordinator?.openLevel(level: self.viewModel.levels[indexPath.row], color: viewModel.levelColors[indexPath.row], progress: self.viewModel.progressFor(level: indexPath.row))
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "BigLevel", for: indexPath) as! BigLevelCollectionViewCell
        
        
        let level = self.viewModel.levels[indexPath.row]
        let progress = self.viewModel.progressFor(level: indexPath.row)
        
        
        cell.setLevelData(with: level,
                          and: progress,
                          currentAvailableLevel: self.viewModel.overallData?.currentAvailableLevel ?? 1)
        
        cell.backView.backgroundColor = viewModel.levelColors[indexPath.row]
        cell.levelNumber.text = "\(indexPath.row + 1)"
        
        return cell
    }
    
    
    
    @IBAction func logout(_ sender: Any) {
        
        print("Tryin to log out user: \(Auth.auth().currentUser?.email ?? "No hay user :(")")
        
        if Auth.auth().currentUser != nil {

            
            do {
                try Auth.auth().signOut()
//                let vc = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(withIdentifier: "InitialViewController")
                UserDefaults.standard.set(nil, forKey: "userLoggedIn")
                
                self.coordinator?.didFinishDeauthenticating()
                
                
//                self.navigationController?.popToRootViewController(animated: true)
                
            } catch let error as NSError {
                print(error.localizedDescription)
            }
        }
    }
    
    
}
