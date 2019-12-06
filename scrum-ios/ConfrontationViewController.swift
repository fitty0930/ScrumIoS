//
//  ConfrontationViewController.swift
//  scrum-ios
//
//  Created by Matias on 13/10/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import UIKit

class ConfrontationViewController: UIViewController {
   
    @IBOutlet weak var player3cardImage: UIImageView!
    @IBOutlet weak var player3cardValue: UILabel!
    @IBOutlet weak var myCardImage: UIImageView!
    @IBOutlet weak var myCardValue: UILabel!
    weak var ppGameDelegate: PlanningPokerGameDelegate?

    
    var myCardStringValue = ""
    var player3CardStringValue = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        
        player3cardValue.text = player3CardStringValue
        myCardValue.text = myCardStringValue
    }
    @IBAction func next(_ sender: Any) {
        PopUpMessages.showNotificationMessage(with: "Calculando...", desc:  "Simulando explicaciones e iteraciones de sobre el item", buttonMessage: "", messageType: .waiting, textColor: .black) {
            self.ppGameDelegate?.move(to: .conclusion)

        }

    }

}
