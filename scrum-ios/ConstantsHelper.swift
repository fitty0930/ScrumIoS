//
//  ConstantsHelper.swift
//  scrum-ios
//
//  Created by Matias Glessi on 6/4/17.
//  Copyright © 2017 Matias Glessi. All rights reserved.
//

import Foundation
import UIKit

class ConstantsHelper {
    
    enum LevelStatus {
        static let notStarted = "NO INICIADO"
        static let started = "EN CURSO"
        static let blocked = "BLOQUEADO"
    }

    enum Storyboard {
        static let main = "Main"
        static let levels = "Levels"
        static let tutorial = "Tutorial"
    }

    
    
    static var levels: [Level] = []
    static var sublevels: [SubLevel] = []
    
    
    static let SublevelCompletedInfo = "com.matiasglessi.scrum.sublevelCompletedInfo"

}


extension Notification.Name {
    public static let SublevelCompleted = Notification.Name.init("com.matiasglessi.scrum.SublevelCompleted")
    public static let UserLoggedIn = Notification.Name.init("com.matiasglessi.scrum.UserLoggedIn")
    public static let didFinishAllSublevels = Notification.Name("didFinishAllSublevels")


}

extension UIColor {
    
    static let sgOrange = #colorLiteral(red: 0.9725490196, green: 0.6941176471, blue: 0.5843137255, alpha: 1)
    static let sgPink = #colorLiteral(red: 0.9647058824, green: 0.4470588235, blue: 0.5019607843, alpha: 1)
    static let sgDarkPink = #colorLiteral(red: 0.7529411765, green: 0.4235294118, blue: 0.5176470588, alpha: 1)
    static let sgPurple = #colorLiteral(red: 0.4235294118, green: 0.3568627451, blue: 0.4823529412, alpha: 1)
    static let sgDarkBlue = #colorLiteral(red: 0.2078431373, green: 0.3607843137, blue: 0.4901960784, alpha: 1)
}

