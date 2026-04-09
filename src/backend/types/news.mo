import Common "common";

module {
  public type NewsArticle = {
    id : Common.NewsId;
    title : Text;
    content : Text;
    imageUrl : Text;
    publishDate : Common.Timestamp;
    createdAt : Common.Timestamp;
  };

  public type NewsInput = {
    title : Text;
    content : Text;
    imageUrl : Text;
    publishDate : Common.Timestamp;
  };

  public type LineupEntry = {
    id : Common.LineupId;
    festivalId : Common.FestivalId;
    artistName : Text;
    stage : Text;
    timeSlot : Text;
    day : ?Text;
    weekend : ?Text;
  };

  public type LineupInput = {
    festivalId : Common.FestivalId;
    artistName : Text;
    stage : Text;
    timeSlot : Text;
    day : ?Text;
    weekend : ?Text;
  };
};
