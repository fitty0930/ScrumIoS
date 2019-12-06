//
//  ConclusionViewController.swift
//  scrum-ios
//
//  Created by Matias on 13/10/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import UIKit

class ConclusionViewController: UIViewController {

    @IBOutlet weak var conclusionCardBackground: UIImageView!
    @IBOutlet weak var conclusionCardValue: UILabel!
    weak var ppGameDelegate: PlanningPokerGameDelegate?

    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        conclusionCardValue.text = "8"
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    @IBAction func next(_ sender: Any) {
        PopUpMessages.showNotificationMessage(with: "Calculando...", desc:  "Simulando iteraciones de planning poker sobre los demas items", buttonMessage: "", messageType: .waiting, textColor: .black) {
            self.ppGameDelegate?.move(to: .sprintBacklog)
        }

    }
}
