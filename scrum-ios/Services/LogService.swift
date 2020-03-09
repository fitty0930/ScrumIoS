//
//  LogService.swift
//  scrum-ios
//
//  Created by Matias on 02/04/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import Foundation
import FirebaseFirestore
import FirebaseAuth
import Firebase
import Amplitude_iOS

class LogService {

    static let db = Firestore.firestore()

    static func gameCorrectInFirstTryAnswer(level: Int, sublevel: Int, game: Int, time: Int) {
        
        let eventData: [String: Any] = [
            "uuid": Auth.auth().currentUser?.uid ?? "-",
            "type": "game_correct_answer_in_first_try",
            "value": "\(time)",
            "level": "\(level).\(sublevel).\(game)"
        ]
        
        Analytics.logEvent("game_correct_answer_in_first_try", parameters: eventData)
//        Amplitude.instance()?.logEvent("game_correct_answer_in_first_try", withEventProperties: eventData, outOfSession: false)

        
    }
    
    
    static func gameCorrectAnswer(level: Int, sublevel: Int, game: Int, time: Int) {
        
        let eventData: [String: Any] = [
            "uuid": Auth.auth().currentUser?.uid ?? "-",
            "type": "game_correct_answerr",
            "value": "\(time)",
            "level": "\(level).\(sublevel).\(game)"
        ]
        
        Analytics.logEvent("game_correct_answerr", parameters: eventData)
//        Amplitude.instance()?.logEvent("game_correct_answer", withEventProperties: eventData, outOfSession: false)

        
    }

    
    static func gameWrongAnswer(level: Int, sublevel: Int, game: Int, time: Int) {
        
        let eventData: [String: Any] = [
            "uuid": Auth.auth().currentUser?.uid ?? "-",
            "type": "game_wrong_answer",
            "value": "\(time)",
            "level": "\(level).\(sublevel).\(game)"
        ]
        
        let currentUserUID = ""
        
        
        
        Analytics.logEvent("game_wrong_answer",
                           parameters: ["uuid": currentUserUID,
                                        "time_spent": time,
                                        "level": level]
        )
        
        
        
        
        
        
//        Amplitude.instance()?./logEvent("game_wrong_answer", withEventProperties: eventData, outOfSession: false)


    }
    
    static func gameTimeSpent(level: Int, sublevel: Int, game: Int, time: Int) {
        
        let eventData: [String: Any] = [
            "uuid": Auth.auth().currentUser?.uid ?? "-",
            "type": "game_time_spent",
            "value": "\(time)",
            "level": "\(level).\(sublevel).\(game)",
        ]
        
        Analytics.logEvent("game_time_spent", parameters: eventData)
//        Amplitude.instance()?.logEvent("game_time_spent", withEventProperties: eventData, outOfSession: false)


    }
    
    static func tutorialTimeSpent(level: Int, sublevel: Int, time: Int) {
        
        let eventData: [String: Any] = [
            "uuid": Auth.auth().currentUser?.uid ?? "-",
            "type": "tutorial_time_spent",
            "value": "\(time)",
            "level": "\(level).\(sublevel)",
        ]

        Analytics.logEvent("tutorial_time_spent", parameters: eventData)
//        Amplitude.instance()?.logEvent("tutorial_time_spent", withEventProperties: eventData, outOfSession: false)

        
    }
    
    static func tutorialSkipped(level: Int, sublevel: Int) {
        
        let eventData: [String: Any] = [
            "uuid": Auth.auth().currentUser?.uid ?? "-",
            "type": "tutorial_skipped",
            "level": "\(level).\(sublevel)",
        ]
        
        Analytics.logEvent("tutorial_skipped", parameters: eventData)
//        Amplitude.instance()?.logEvent("tutorial_skipped", withEventProperties: eventData, outOfSession: false)
        
//        Amplitude.instance()?.printEventsCount()
//
//        Amplitude.instance()?.uploadEvents()
    }
    
}
