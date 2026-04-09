import NewsTypes "../types/news";
import Common "../types/common";
import NewsLib "../lib/news";
import List "mo:core/List";

mixin (
  news : List.List<NewsTypes.NewsArticle>,
  lineup : List.List<NewsTypes.LineupEntry>,
) {
  var nextNewsId : Nat = news.size() + 1;
  var nextLineupId : Nat = lineup.size() + 1;

  public query func getNews() : async [NewsTypes.NewsArticle] {
    NewsLib.getNews(news)
  };

  public query func getNewsArticle(id : Common.NewsId) : async ?NewsTypes.NewsArticle {
    NewsLib.getNewsArticle(news, id)
  };

  public func addNews(input : NewsTypes.NewsInput) : async Common.NewsId {
    let a = NewsLib.addNews(news, nextNewsId, input);
    nextNewsId += 1;
    a.id
  };

  public func updateNews(id : Common.NewsId, input : NewsTypes.NewsInput) : async Bool {
    NewsLib.updateNews(news, id, input)
  };

  public func deleteNews(id : Common.NewsId) : async Bool {
    NewsLib.deleteNews(news, id)
  };

  public query func getLineup(festivalId : Common.FestivalId) : async [NewsTypes.LineupEntry] {
    NewsLib.getLineup(lineup, festivalId)
  };

  public func addLineupEntry(input : NewsTypes.LineupInput) : async Common.LineupId {
    let e = NewsLib.addLineupEntry(lineup, nextLineupId, input);
    nextLineupId += 1;
    e.id
  };

  public func updateLineupEntry(id : Common.LineupId, input : NewsTypes.LineupInput) : async Bool {
    NewsLib.updateLineupEntry(lineup, id, input)
  };

  public func deleteLineupEntry(id : Common.LineupId) : async Bool {
    NewsLib.deleteLineupEntry(lineup, id)
  };
};
