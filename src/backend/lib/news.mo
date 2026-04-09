import Types "../types/news";
import Common "../types/common";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public func getNews(
    news : List.List<Types.NewsArticle>
  ) : [Types.NewsArticle] {
    news.toArray()
  };

  public func getNewsArticle(
    news : List.List<Types.NewsArticle>,
    id : Common.NewsId,
  ) : ?Types.NewsArticle {
    news.find(func(a) { a.id == id })
  };

  public func addNews(
    news : List.List<Types.NewsArticle>,
    nextId : Nat,
    input : Types.NewsInput,
  ) : Types.NewsArticle {
    let article : Types.NewsArticle = {
      id = nextId;
      title = input.title;
      content = input.content;
      imageUrl = input.imageUrl;
      publishDate = input.publishDate;
      createdAt = Time.now();
    };
    news.add(article);
    article
  };

  public func updateNews(
    news : List.List<Types.NewsArticle>,
    id : Common.NewsId,
    input : Types.NewsInput,
  ) : Bool {
    let idx = news.findIndex(func(a) { a.id == id });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = news.at(i);
        news.put(i, {
          existing with
          title = input.title;
          content = input.content;
          imageUrl = input.imageUrl;
          publishDate = input.publishDate;
        });
        true
      };
    }
  };

  public func deleteNews(
    news : List.List<Types.NewsArticle>,
    id : Common.NewsId,
  ) : Bool {
    let sizeBefore = news.size();
    let filtered = news.filter(func(a) { a.id != id });
    news.clear();
    news.append(filtered);
    news.size() < sizeBefore
  };

  public func getLineup(
    lineup : List.List<Types.LineupEntry>,
    festivalId : Common.FestivalId,
  ) : [Types.LineupEntry] {
    lineup.filter(func(e) { e.festivalId == festivalId }).toArray()
  };

  public func addLineupEntry(
    lineup : List.List<Types.LineupEntry>,
    nextId : Nat,
    input : Types.LineupInput,
  ) : Types.LineupEntry {
    let entry : Types.LineupEntry = {
      id = nextId;
      festivalId = input.festivalId;
      artistName = input.artistName;
      stage = input.stage;
      timeSlot = input.timeSlot;
    };
    lineup.add(entry);
    entry
  };

  public func updateLineupEntry(
    lineup : List.List<Types.LineupEntry>,
    id : Common.LineupId,
    input : Types.LineupInput,
  ) : Bool {
    let idx = lineup.findIndex(func(e) { e.id == id });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = lineup.at(i);
        lineup.put(i, {
          existing with
          festivalId = input.festivalId;
          artistName = input.artistName;
          stage = input.stage;
          timeSlot = input.timeSlot;
        });
        true
      };
    }
  };

  public func deleteLineupEntry(
    lineup : List.List<Types.LineupEntry>,
    id : Common.LineupId,
  ) : Bool {
    let sizeBefore = lineup.size();
    let filtered = lineup.filter(func(e) { e.id != id });
    lineup.clear();
    lineup.append(filtered);
    lineup.size() < sizeBefore
  };
};
