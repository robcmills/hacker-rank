import { expect } from 'chai';
import { MaxHeap } from './max-heap';

/*
355. Design Twitter
Medium
Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the 10 most recent tweets in the user's news feed.

Implement the Twitter class:

Twitter() Initializes your twitter object.
void postTweet(int userId, int tweetId) Composes a new tweet with ID tweetId by the user userId. Each call to this function will be made with a unique tweetId.
List<Integer> getNewsFeed(int userId) Retrieves the 10 most recent tweet IDs in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user themself. Tweets must be ordered from most recent to least recent.
void follow(int followerId, int followeeId) The user with ID followerId started following the user with ID followeeId.
void unfollow(int followerId, int followeeId) The user with ID followerId started unfollowing the user with ID followeeId.
 

Example 1:

Input
["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]
[[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]
Output
[null, null, [5], null, null, [6, 5], null, [5]]

Explanation
Twitter twitter = new Twitter();
twitter.postTweet(1, 5); // User 1 posts a new tweet (id = 5).
twitter.getNewsFeed(1);  // User 1's news feed should return a list with 1 tweet id -> [5]. return [5]
twitter.follow(1, 2);    // User 1 follows user 2.
twitter.postTweet(2, 6); // User 2 posts a new tweet (id = 6).
twitter.getNewsFeed(1);  // User 1's news feed should return a list with 2 tweet ids -> [6, 5]. Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5.
twitter.unfollow(1, 2);  // User 1 unfollows user 2.
twitter.getNewsFeed(1);  // User 1's news feed should return a list with 1 tweet id -> [5], since user 1 is no longer following user 2.
 

Constraints:

1 <= userId, followerId, followeeId <= 500
0 <= tweetId <= 104
All the tweets have unique IDs.
At most 3 * 104 calls will be made to postTweet, getNewsFeed, follow, and unfollow.


### Approach

tweets = {
  1: [[1, 1]],
  2: [[2, 2]],
  3: [[3, 3], [4, 4]],
}

*/
type FolloweeId = number;

export class Twitter {
  private order: number; // the global "count" or "time" the tweet was created, used to order tweets in terms of recency
  private tweets: { [userId: number]: { order: number; tweetId: number }[] };
  private follows: { [followerId: number]: Set<FolloweeId> };

  constructor() {
    this.order = 0;
    this.tweets = {};
    this.follows = {};
  }

  postTweet(userId: number, tweetId: number): void {
    if (!(userId in this.tweets)) this.tweets[userId] = [];
    this.tweets[userId].push({ order: this.order, tweetId });
    this.order += 1;
  }

  getNewsFeed(userId: number): number[] {
    const feed: number[] = [];
    // Include users own tweets
    this.follow(userId, userId);
    const followeeIds = Array.from(this.follows[userId].values());
    const meta: {
      [order: number]: { tweetId: number; followeeId: number; index: number };
    } = {};
    const heap = new MaxHeap();
    // Iterate followeeIds (once) and add their most recent tweet to a MaxHeap.
    // Include the order, tweetId, followeeId, and index (in tweets array) starting at end (most recent). We will need this to get next most recent tweet from each followee.
    for (const followeeId of followeeIds) {
      if (!(followeeId in this.tweets)) continue;
      const index = this.tweets[followeeId].length - 1;
      const { order, tweetId } = this.tweets[followeeId][index];
      heap.insert(order);
      meta[order] = { tweetId, followeeId, index: index - 1 };
    }
    // While the heap still has items and the feed array length is less than 10,
    // shift the most recent tweet out of the heap, append it to feed,
    // and insert next most recent tweet from that followee into the heap
    while (heap.size() > 0 && feed.length < 10) {
      const order = heap.shift() as number;
      const { tweetId, followeeId, index } = meta[order];
      feed.push(tweetId);
      delete meta[order];
      if (index >= 0) {
        const { order, tweetId } = this.tweets[followeeId][index];
        heap.insert(order);
        meta[order] = { tweetId, followeeId, index: index - 1 };
      }
    }
    return feed;
  }

  follow(followerId: number, followeeId: number): void {
    if (!(followerId in this.follows)) {
      this.follows[followerId] = new Set<number>();
    }
    this.follows[followerId].add(followeeId);
  }

  unfollow(followerId: number, followeeId: number): void {
    if (!(followerId in this.follows)) return;
    this.follows[followerId].delete(followeeId);
  }
}

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */

{
  const twitter = new Twitter();
  twitter.postTweet(1, 5); // User 1 posts a new tweet (id = 5).
  expect(twitter.getNewsFeed(1)).to.deep.equal([5]);
  twitter.follow(1, 2); // User 1 follows user 2.
  twitter.postTweet(2, 6); // User 2 posts a new tweet (id = 6).
  expect(twitter.getNewsFeed(1)).to.deep.equal([6, 5]);
  twitter.unfollow(1, 2); // User 1 unfollows user 2.
  expect(twitter.getNewsFeed(1)).to.deep.equal([5]);
}

{
  const twitter = new Twitter();
  twitter.postTweet(1, 4);
  twitter.postTweet(2, 5);
  twitter.unfollow(1, 2);
  expect(twitter.getNewsFeed(1)).to.deep.equal([4]);
}
