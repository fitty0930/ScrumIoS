//
//  SystemLevelsService.swift
//  scrum-ios
//
//  Created by Matias on 10/03/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import Foundation
import SwiftyJSON

class SystemLevelsService {
    
    
    static func getLevels(completionHandler: @escaping (_ levels: [Level], _ error: Error?) -> Void) {
        
        var value = 1
        var levels = [Level]()
        
        while let path = Bundle.main.path(forResource: "level\(value)", ofType: "json") {
            do {
                let data = try Data(contentsOf: URL(fileURLWithPath: path), options: .alwaysMapped)
                let jsonObj = try JSON(data: data)
                
                if let level = Level(json: jsonObj) {
                    levels.append(level)
                }
                value = value + 1
                
            } catch let error {
                print("parse error: \(error.localizedDescription)")
                completionHandler([], error)
                
            }
        }
        completionHandler(levels, nil)
    }
    
    
    static func getSublevels(for level: Level ,completionHandler: @escaping (_ sublevels: [SubLevel], _ error: Error?) -> Void)  {
        if let levelValue = level.id, let path = Bundle.main.path(forResource: "level\(levelValue)", ofType: "json") {
            do {
                let data = try Data(contentsOf: URL(fileURLWithPath: path), options: .alwaysMapped)
                let jsonObj = try JSON(data: data)
                
                
                let sublevels = jsonObj["sublevels"].arrayValue.compactMap({ SubLevel(json: $0) })
                
                completionHandler(sublevels, nil)
                
            } catch let error {
                print("parse error: \(error.localizedDescription)")
                completionHandler([], error)
            }
        } else {
            print("Invalid filename/path.")
            completionHandler([], NSError.init())
        }

    }
    
    
}
