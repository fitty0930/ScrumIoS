//
//  GradientButton.swift
//  scrum-ios
//
//  Created by Matias on 05/10/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import Foundation
import UIKit

@IBDesignable
class GradientButton: UIButton {
    
    @IBInspectable var firstColor: UIColor = UIColor.clear {
        didSet {
            updateView()
        }
    }
    
    @IBInspectable var secondColor: UIColor = UIColor.clear {
        didSet {
            updateView()
        }
    }
    
    @IBInspectable var startPoint: CGPoint = CGPoint(x: 0, y: 0.5) {
        didSet {
            updateView()
        }
    }
    
    
    @IBInspectable var endPoint: CGPoint = CGPoint (x: 1, y: 0.5) {
        didSet {
            updateView()
        }
    }
    
    //Shadow
    
    
    @IBInspectable var hasShadow: Bool = false {
        didSet {
            updateView()
        }
    }
    
    @IBInspectable var shadowColor: UIColor = UIColor.black {
        didSet {
            self.updateView()
        }
    }
    
    @IBInspectable var shadowOpacity: Float = 0.5 {
        didSet {
            self.updateView()
        }
    }
    @IBInspectable var shadowOffset: CGSize = CGSize(width: 3, height: 3) {
        didSet {
            self.updateView()
        }
    }
    @IBInspectable var shadowRadius: CGFloat = 15.0 {
        didSet {
            self.updateView()
        }
    }
    
    
    @IBInspectable var cornerRadius: CGFloat = 0.0 {
        didSet {
            self.updateView()
        }
    }
    
    @IBInspectable var disabledColor: UIColor = UIColor.blue {
        didSet {
            self.updateView()
        }
    }
    
    @IBInspectable var disabledTextColor: UIColor = UIColor.gray {
        didSet {
            self.updateView()
        }
    }
    
    @IBInspectable var enabledTextColor: UIColor = UIColor.white {
        didSet {
            self.updateView()
        }
    }
    
    
    
    override public var isEnabled: Bool {
        didSet {
            updateView()
        }
    }
    
    override class var layerClass: AnyClass {
        get {
            return CAGradientLayer.self
        }
    }
    
    
    override func awakeFromNib() {
        super.awakeFromNib()
        
    }
    
    func updateView() {
        let layer = self.layer as! CAGradientLayer
        
        if isEnabled {
            layer.colors = [firstColor, secondColor].map {$0.cgColor}
        } else {
            layer.colors = [disabledColor, disabledColor].map{$0.cgColor}
        }
        layer.startPoint = startPoint
        layer.endPoint = endPoint
        setTitleColor(enabledTextColor, for: .normal)
        setTitleColor(disabledTextColor, for: .disabled)
        
        
        if hasShadow  && isEnabled {
            self.layer.shadowColor = self.shadowColor.cgColor
            self.layer.shadowOpacity = self.shadowOpacity
            self.layer.shadowOffset = self.shadowOffset
            self.layer.shadowRadius = self.shadowRadius
            self.layer.masksToBounds = false
            self.clipsToBounds = false
        }
        else {
            self.layer.shadowColor = UIColor.clear.cgColor
        }
        
        self.layer.cornerRadius = cornerRadius
    }
}
