import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Twitter, Heart, MessageCircle, Repeat2, Send } from "lucide-react";

const twitterData = {
  profile: {
    followers: "12.5K",
    following: "1.2K",
    tweets: "3,400"
  },
  recentTweets: [
    { id: 1, content: "Just published a new analysis on content trends! 🚀", likes: 45, retweets: 12, replies: 8, time: "2h" },
    { id: 2, content: "AI-powered video analysis is changing the game for content creators", likes: 32, retweets: 8, replies: 5, time: "6h" },
    { id: 3, content: "Color psychology in social media: Why it matters more than you think", likes: 67, retweets: 23, replies: 14, time: "1d" }
  ],
  scheduledPosts: [
    { id: 1, content: "Weekly content strategy tips coming tomorrow!", scheduledFor: "Tomorrow 10:00 AM" },
    { id: 2, content: "New video analysis features launching next week!", scheduledFor: "Friday 2:00 PM" }
  ]
};

const TwitterDashboard = () => {
  const [newTweet, setNewTweet] = useState("");
  const [hashtags, setHashtags] = useState("#contentcreator #AI #analytics");

  const handleTweet = () => {
    if (!newTweet.trim()) return;
    
    toast({
      title: "Tweet posted!",
      description: "Your tweet has been published successfully.",
    });
    setNewTweet("");
  };

  const handleSchedule = () => {
    if (!newTweet.trim()) return;
    
    toast({
      title: "Tweet scheduled!",
      description: "Your tweet has been scheduled for optimal engagement time.",
    });
    setNewTweet("");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        <span className="gradient-text flex items-center gap-2">
          <Twitter className="h-8 w-8" />
          Twitter Dashboard
        </span>
      </h1>

      {/* Account Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-black/20 border-white/10">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{twitterData.profile.followers}</div>
              <div className="text-sm text-gray-400">Followers</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-black/20 border-white/10">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{twitterData.profile.following}</div>
              <div className="text-sm text-gray-400">Following</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-black/20 border-white/10">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{twitterData.profile.tweets}</div>
              <div className="text-sm text-gray-400">Tweets</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compose Tweet */}
      <Card className="bg-black/20 border-white/10 mb-6">
        <CardHeader>
          <CardTitle>Compose Tweet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            placeholder="What's happening?"
            value={newTweet}
            onChange={(e) => setNewTweet(e.target.value)}
            className="min-h-24"
          />
          <Input 
            placeholder="Add hashtags..."
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">{280 - newTweet.length} characters remaining</span>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSchedule}>
                Schedule
              </Button>
              <Button onClick={handleTweet}>
                <Send className="h-4 w-4 mr-2" />
                Tweet
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tweets */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle>Recent Tweets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {twitterData.recentTweets.map((tweet) => (
                <div key={tweet.id} className="p-4 bg-black/30 rounded-lg border border-white/5">
                  <p className="mb-3">{tweet.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {tweet.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Repeat2 className="h-4 w-4" />
                        {tweet.retweets}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {tweet.replies}
                      </span>
                    </div>
                    <span>{tweet.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scheduled Posts */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle>Scheduled Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {twitterData.scheduledPosts.map((post) => (
                <div key={post.id} className="p-4 bg-black/30 rounded-lg border border-white/5">
                  <p className="mb-2">{post.content}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{post.scheduledFor}</Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="destructive">Cancel</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TwitterDashboard;