//
//  PivoteViewController.swift
//  scrum-ios
//
//  Created by Matias on 12/10/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import UIKit

class PivoteViewController: UIViewController {

    @IBOutlet weak var explanationLabel: UILabel!
    weak var ppGameDelegate: PlanningPokerGameDelegate?

    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBAction func next(_ sender: Any) {
        ppGameDelegate?.move(to: .pbiEstimation)
    }
}
