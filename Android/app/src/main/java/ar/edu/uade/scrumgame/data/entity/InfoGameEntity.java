package ar.edu.uade.scrumgame.data.entity;

import java.util.List;

public class InfoGameEntity {
    private String code;
    private String type;
    private String title;
    private List<GameContentEntity> content;

    public InfoGameEntity() {
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<GameContentEntity> getContent() {
        return content;
    }

    public void setContent(List<GameContentEntity> content) {
        this.content = content;
    }
}
