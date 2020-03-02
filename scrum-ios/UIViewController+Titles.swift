//
//  UIViewController+Titles.swift
//  scrum-ios
//
//  Created by Matias on 21/09/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import Foundation
import UIKit

extension UIViewController {
    func setAttributedLabelFor(text: String, and description: String = "") -> NSAttributedString {
        
        let count = text.count
        
        let fullTitle = text + description
        
        let attributedString = NSMutableAttributedString(string: fullTitle, attributes: [
            .font: UIFont(name:"GothamRounded-Light", size: 17.0)!,
            .foregroundColor: UIColor.black
            ])
        attributedString.addAttributes([
            .font: getFont(named: "GothamRounded-Bold", sized: 16.0),
            .foregroundColor: UIColor.black
            ], range: NSRange(location: 0, length: count))
        return attributedString
    }
    
    
    
    //    Family: Gotham Rounded Font names: ["GothamRounded-BoldItalic", "GothamRounded-MediumItalic", "GothamRounded-BookItalic", "GothamRounded-Book", "GothamRounded-Light", "GothamRounded-LightItalic", "GothamRounded-Bold", "GothamRounded-Medium"]

    
    func getFont(named name: String, sized size: CGFloat) -> UIFont {
        if let font = UIFont.init(name: name, size: size) {
            return font
        }
        print("FONT ERROR:  to load the \(name) font. Make sure the font file is included in the project and the font name is spelled correctly. ")
        return UIFont.systemFont(ofSize: size)
    }
}

extension String {
    
    func widthOfString(usingFont font: UIFont) -> CGFloat {
        let fontAttributes = [NSAttributedStringKey.font: font]
        let size = self.size(withAttributes: fontAttributes)
        return size.width
    }
}
