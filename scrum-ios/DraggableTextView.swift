//
//  DraggableTextView.swift
//  scrum-ios
//
//  Created by Matias on 24/08/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import Foundation
import UIKit

class DraggableTextView: UIView {
    
    weak var draggableContainerDelegate: DraggableViewDelegate?

//    var text: String = ""
    
    var lastLocation: CGPoint = CGPoint.init()
    var originalLocation: CGPoint = CGPoint.init()
    var finalLocation: CGPoint = CGPoint.init()
    
    private lazy var containedLabel: UILabel = {
        let label = UILabel(frame: CGRect(origin: CGPoint(x: 0, y: 0)
            , size: CGSize(width: bounds.width, height: bounds.height)))
        label.textAlignment = .center
        label.numberOfLines = 0
        label.textColor = .white
        label.adjustsFontSizeToFitWidth = true
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    init(frame: CGRect, text: String, finalLocation: CGPoint, color: UIColor, tag: Int){
        super.init(frame: frame)
        let panRecognizer = UIPanGestureRecognizer.init(target: self, action:#selector(self.detectPan(recognizer:)))
        self.gestureRecognizers = [panRecognizer]
        self.isUserInteractionEnabled = true
        self.originalLocation = frame.origin
        self.finalLocation = finalLocation
        self.containedLabel.text = text
        
//        self.draggableContainerDelegate = delegate
        self.tag = tag
        self.backgroundColor = color
        
//        self.containedLabel.centerXAnchor.constraint(equalTo: self.centerXAnchor).isActive = true
//        self.containedLabel.centerYAnchor.constraint(equalTo: self.centerYAnchor).isActive = true

        self.addSubview(containedLabel)

    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    
    @objc func detectPan(recognizer: UIPanGestureRecognizer){
        self.draggableContainerDelegate?.dismissOldToolTipIfPresent()
        let translation = recognizer.translation(in: self.superview)
        self.center = CGPoint.init(x: lastLocation.x + translation.x, y: lastLocation.y + translation.y)
        if recognizer.state == .ended {
            if (!self.isNearTarget(center: self.center)){
                self.frame.origin = self.originalLocation
            }
            else {
                self.draggableContainerDelegate?.setted(view: self)
                self.center = finalLocation
                self.isUserInteractionEnabled = false
                
            }
        }
        
    }
    
    func isNearTarget(center: CGPoint) -> Bool{
        
        if self.finalLocation.x - 20 ... self.finalLocation.x + 20 ~= center.x {
            if self.finalLocation.y - 20 ... self.finalLocation.y + 20 ~= center.y {
                return true
            }
        }
        return false
    }
    
    func isWithinViewLimits() {
        
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        self.superview?.bringSubview(toFront: self)
        self.lastLocation = self.center
        lastLocation = self.center;
    }
}
