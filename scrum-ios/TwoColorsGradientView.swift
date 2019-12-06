//
//  GradientView.swift
//  scrum-ios
//
//  Created by Matias on 21/09/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import Foundation
import UIKit


@IBDesignable
class TwoColorsGradientView: UIView {
    
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
    
    //    @IBInspectable var isHorizontal: Bool = true {
    //        didSet {
    //            updateView()
    //        }
    //    }
    
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
    
    override class var layerClass: AnyClass {
        get {
            return CAGradientLayer.self
        }
    }
    
    func updateView() {
        let layer = self.layer as! CAGradientLayer
        layer.colors = [firstColor, secondColor].map {$0.cgColor}
        //        if (isHorizontal) {
        //            layer.startPoint = CGPoint(x: 0, y: 0.5)
        //            layer.endPoint = CGPoint (x: 1, y: 0.5)
        //        } else {
        //            layer.startPoint = CGPoint(x: 0.5, y: 0)
        //            layer.endPoint = CGPoint (x: 0.5, y: 1)
        //        }
        layer.startPoint = startPoint
        layer.endPoint = endPoint
        
        if hasShadow {
            self.layer.shadowColor = self.shadowColor.cgColor
            self.layer.shadowOpacity = self.shadowOpacity
            self.layer.shadowOffset = self.shadowOffset
            self.layer.shadowRadius = self.shadowRadius
            self.layer.masksToBounds = false
            self.clipsToBounds = false
        }
        self.layer.cornerRadius = cornerRadius
        
        
    }
    
}


@IBDesignable
class MultipleColorsGradientView: UIView {
    
    
    var colors: [UIColor] = [] {
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
    
    override class var layerClass: AnyClass {
        get {
            return CAGradientLayer.self
        }
    }
    
    func updateView() {
        let layer = self.layer as! CAGradientLayer
        layer.colors = colors.map {$0.cgColor}
        //        if (isHorizontal) {
        //            layer.startPoint = CGPoint(x: 0, y: 0.5)
        //            layer.endPoint = CGPoint (x: 1, y: 0.5)
        //        } else {
        //            layer.startPoint = CGPoint(x: 0.5, y: 0)
        //            layer.endPoint = CGPoint (x: 0.5, y: 1)
        //        }
        layer.startPoint = startPoint
        layer.endPoint = endPoint
        
        if hasShadow {
            self.layer.shadowColor = self.shadowColor.cgColor
            self.layer.shadowOpacity = self.shadowOpacity
            self.layer.shadowOffset = self.shadowOffset
            self.layer.shadowRadius = self.shadowRadius
            self.layer.masksToBounds = false
            self.clipsToBounds = false
        }
        self.layer.cornerRadius = cornerRadius
        
        
    }
    
}
