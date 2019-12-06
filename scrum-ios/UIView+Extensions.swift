//
//  UIView+Extensions.swift
//  scrum-ios
//
//  Created by Matias on 13/04/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import Foundation
import UIKit

extension UIView {
    
    func show() {
        self.isHidden = false
    }
    
    func hide(){
        self.isHidden = true
    }
    
    func setBorder(width: CGFloat, color: CGColor? = nil) {
        self.layer.borderWidth = width
        self.layer.borderColor = color
    }
    
    
    func round(to value: CGFloat? = nil){
        if let value = value {
            self.layer.cornerRadius = value
        }
        else {
            self.layer.cornerRadius = self.frame.size.width/2
        }
        self.clipsToBounds = true
    }
}
