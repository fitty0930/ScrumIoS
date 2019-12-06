//
//  AskingEstimationViewController.swift
//  scrum-ios
//
//  Created by Matias on 23/09/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import UIKit

class AskingEstimationViewController: UIViewController {

    @IBOutlet weak var playButton: GradientButton!
    @IBOutlet weak var estimationTextField: UITextField!
    @IBOutlet weak var estimationSignView: TwoColorsGradientView!
    weak var velocityGameDelegate: VelocityGameDelegate?

    
    var gameTimer: Timer?

    override func viewDidLoad() {
        super.viewDidLoad()
        estimationTextField.delegate = self
        startTimer()

    }
    
    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        stopTimer()
    }
    
    
    func startTimer(){
        gameTimer = Timer.scheduledTimer(timeInterval: 3, target: self, selector: #selector(updateTimer), userInfo: nil, repeats: true)
    }
    
    @objc func updateTimer() {
        estimationSignView.shake()
    }
    
    func stopTimer(){
        gameTimer?.invalidate()
    }


    @IBAction func play(_ sender: Any) {
        
        if let text = estimationTextField.text, let intValue = Int(text) {
            velocityGameDelegate?.setEstimation(intValue)
            if text.count > 0 { velocityGameDelegate?.move(to: .spaceGame) }
        }
    }
}


extension AskingEstimationViewController: UITextFieldDelegate {

    func textFieldShouldBeginEditing(_ textField: UITextField) -> Bool {
        return true
    }
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        if let text = textField.text {
            playButton.isEnabled = text.count > 0
        }
        return true
    }
}

extension UIView {
    func shake() {
        self.transform = CGAffineTransform(translationX: 5, y: 5)
        UIView.animate(withDuration: 0.4, delay: 0, usingSpringWithDamping: 0.2, initialSpringVelocity: 1, options: .curveEaseInOut, animations: {
            self.transform = CGAffineTransform.identity
        }, completion: nil)
    }
}
