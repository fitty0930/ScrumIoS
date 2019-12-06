//
//  Sublevel.swift
//  scrum-ios
//
//  Created by Matias on 02/04/2019.
//  Copyright © 2019 Matias Glessi. All rights reserved.
//

import Foundation
import SwiftyJSON

public enum LevelStatus: String {
    
    case locked = "BLOQUEADO"
    case available = "INICIAR"
    case started = "EN CURSO"
    case finished = "COMPLETO"
    
    public func asString() -> String {
        return self.rawValue
    }
}


class SubLevel: BaseModel {
    
    var percentage: Int?
    var name: String?
    var code: String?
    var theoryWatched: Bool = false
    var theoricalSteps: [Step]?
    var games: [Game]?
    
    
    
    var id: Int {
        return getId()
    }
    
    var status: LevelStatus?
    
    override init() {}
    
    init?(json: JSON) {
        super.init()
        self.name = json["name"].stringValue
        self.code = json["code"].stringValue
        self.theoricalSteps = json["info_theory"].arrayValue.compactMap { Step(json: $0) }
        self.games = json["info_games"].arrayValue.compactMap { Game(json: $0) }
    }
    
    fileprivate func hasNeverPlayedBefore(_ current: Int) -> Bool {
        return current == 0
    }
    
    fileprivate func isFirstSublevel() -> Bool {
        return id == 1
    }
    
    func getStatus(for progress: Progress, and current: Int) -> ProgressStatus {
        
        let completion = self.percentage(from: progress, forPrevious: false)
        
        if hasNeverPlayedBefore(current) { // NO ARRANCO NADA AUN
            if isFirstSublevel() { return ProgressStatus.init(status: .available, progress: completion) }
            else {
                return ProgressStatus.init(status: .locked, progress: completion)
            }
        }
        else if current < id { // ACTUAL ES ALGUN SUBLEVEL ANTERIOR
            
            if current == id - 1 {
               
                let lastSublevelProgress = self.percentage(from: progress, forPrevious: true)
                
                if lastSublevelProgress == 100 {
                    return ProgressStatus.init(status: .available, progress: completion)
                }
                else {
                    return ProgressStatus.init(status: .locked, progress: completion)
                }
                
            }
            else {
              return ProgressStatus.init(status: .locked, progress: completion)
            }
        }
        else {
            switch completion {
            case 0:
                return ProgressStatus.init(status: .available, progress: completion)
            case 100:
                return ProgressStatus.init(status: .finished, progress: completion)
            default:
                return ProgressStatus.init(status: .started, progress: completion)
            }
        }
    }
    
    
    
    func percentage(from progress: Progress, forPrevious: Bool) -> Int {

        let id = forPrevious ? self.id - 1 : self.id
        
        if progress.sublevel_id < id {
            return 0
        }
        else if progress.sublevel_id > id {
            return 100
        }
        else {
            let total = progress.total_games + 1
            let doneSoFar = progress.tutorial_completed ? progress.actual_game + 1 : progress.actual_game
            
            return Int(floor(CGFloat(doneSoFar * 100) / CGFloat(total)))
        }
    }
    
    
    
    fileprivate func getId() -> Int{
        
        guard let code = self.code else { return 0 }
        
        let values = code.components(separatedBy: ".")
        
        if values.count > 1, let result = Int(values[1]) {
            return result
        }
        return 0
    }
}

struct ProgressStatus {
    
    var status: LevelStatus
    var progress: Int
    
}
