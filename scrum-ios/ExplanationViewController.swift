//
//  ExplanationViewController.swift
//  scrum-ios
//
//  Created by Matias on 23/09/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import UIKit

class ExplanationViewController: UIViewController {

    var finalResult = 0
    var estimation = 0
    
    @IBOutlet weak var resultAnalysisLabel: UILabel!
    @IBOutlet weak var finalResultLabel: UILabel!
    @IBOutlet weak var estimationLabel: UILabel!
    
    weak var velocityGameDelegate: VelocityGameDelegate?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.finalResultLabel.text = "\(finalResult)"
        self.estimationLabel.text = "\(estimation)"
        self.resultAnalysisLabel.text = getResultAnalysisLabel()
    }
    
    private func getResultAnalysisLabel() -> String {
        
        if finalResult == estimation {
            return "Excelente estimación! Lograste resolver en el tiempo acordado lo que te propusiste!"
        }
        else if finalResult > estimation{
            return "Muy bien! Pudiste hacer mas de lo que te propusiste. Significa que te resultó más fácil de lo que creías."
        }
        else {
            return "Bien igual! No llegaste a completar lo que estimaste, significa que era una tarea mas compleja de lo que creías."
        }
    }
    
    @IBAction func play(_ sender: Any) {
        velocityGameDelegate?.move(to: .finalExplanation)
    }
}
