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
            .font: UIFont(name:"verdana", size: 17.0)!,
            .foregroundColor: UIColor.green
            ])
        attributedString.addAttributes([
            .font: getFont(named: "verdana", sized: 17.0),
            .foregroundColor: UIColor.red
            ], range: NSRange(location: 0, length: count))
        return attributedString
    }
    
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
