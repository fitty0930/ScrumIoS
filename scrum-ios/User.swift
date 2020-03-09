//
//  User.swift
//  scrum-ios
//
//  Created by Matias on 02/02/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.


import Foundation
import SwiftyJSON
import RealmSwift

class User: Object {
    
    @objc dynamic var name: String = ""
    @objc dynamic var mail: String = ""
    @objc dynamic var age: Int = 0
    @objc dynamic var profession: String = ""
    @objc dynamic var gender: String = ""
    @objc dynamic var city: String = ""
    @objc dynamic var state: String = ""
    @objc dynamic var country: String = ""
    @objc dynamic var gameTasteLevel: String = ""
    @objc dynamic var gameTimeLevel: String = ""

    
    @objc dynamic var uid: String = ""
    
    
    func initFrom(json: JSON){
        self.name = json["name"].stringValue
        self.mail = json["mail"].stringValue
        self.age = json["age"].intValue
        self.profession = json["profession"].stringValue
        self.gender = json["gender"].stringValue
        self.city = json["city"].stringValue
        self.state = json["state"].stringValue
        self.country = json["country"].stringValue
        self.gameTasteLevel = json["gameTasteLevel"].stringValue
        self.gameTimeLevel = json["gameTimeLevel"].stringValue
        self.uid = json["uid"].stringValue
    }
    
    
    func generateDataString() -> String {
        return [self.name,
                self.mail,
                "\(self.age)",
                self.profession,
                self.gender,
                self.city,
                self.state,
                self.country,
                self.gameTasteLevel,
                self.gameTimeLevel,
                self.uid].joined(separator: ",")
    }
    
    override static func primaryKey() -> String? {
        return "uid"
    }
}
