//
//  FinalExplanationViewController.swift
//  scrum-ios
//
//  Created by Matias on 21/10/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import UIKit

class FinalExplanationViewController: UIViewController {

    
    weak var velocityGameDelegate: VelocityGameDelegate?

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    @IBAction func next(_ sender: Any) {
        velocityGameDelegate?.move(to: .nextGame)
    }

}
