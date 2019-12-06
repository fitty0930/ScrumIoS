//
//  SpaceGameViewController.swift
//  scrum-ios
//
//  Created by Matias on 21/09/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import UIKit
import SpriteKit
import GameplayKit

class SpaceGameViewController: UIViewController, Storyboarded, SpaceGameDelegate {

    
    weak var velocityGameDelegate: VelocityGameDelegate?
    var estimatedResult = 0
    
    func showAlert(with result: Int) {
        
        velocityGameDelegate?.setFinalResult(result)
        PopUpMessages.showNotificationMessage(with: "Calculando...", desc:  "Calculando datos obtenidos", buttonMessage: "", messageType: .waiting, textColor: .black) {
            self.velocityGameDelegate?.move(to: .explanation)
        }
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        
        if let view = self.view as! SKView? {
            // Load the SKScene from 'GameScene.sks'
            if let scene = SKScene(fileNamed: "GameScene") as? GameScene {
                // Set the scale mode to scale to fit the window
                scene.scaleMode = .aspectFill
                scene.spaceGameDelegate = self
                // Present the scene
                view.presentScene(scene)
            }
            
            view.ignoresSiblingOrder = true
            
//            view.showsFPS = true
//            view.showsNodeCount = true
        }
    }

    override var shouldAutorotate: Bool {
        return false
    }

    override var supportedInterfaceOrientations: UIInterfaceOrientationMask {
        if UIDevice.current.userInterfaceIdiom == .phone {
            return .allButUpsideDown
        } else {
            return .all
        }
    }

    override var prefersStatusBarHidden: Bool {
        return true
    }
}
