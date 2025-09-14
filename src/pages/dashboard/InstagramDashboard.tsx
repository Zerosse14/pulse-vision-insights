import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Instagram, Heart, MessageCircle, Send, Camera, Video } from "lucide-react";

const instagramData = {
  profile: {
    followers: "25.8K",
    following: "894",
    posts: "1,205"
  },
  recentPosts: [
    { id: 1, type: "image", caption: "Behind the scenes of our latest video analysis 📊", likes: 234, comments: 18, time: "3h" },
    { id: 2, type: "video", caption: "Quick tip: Color psychology in content creation", likes: 456, comments: 32, time: "1d" },
    { id: 3, type: "carousel", caption: "Swipe to see our content strategy framework ➡️", likes: 178, comments: 12, time: "2d" }
  ],
  stories: [
    { id: 1, type: "image", views: 1200, time: "2h" },
    { id: 2, type: "video", views: 890, time: "4h" },
    { id: 3, type: "poll", views: 1456, time: "6h" }
  ]
};

const InstagramDashboard = () => {
  const [newPost, setNewPost] = useState("");
  const [hashtags, setHashtags] = useState("#contentcreator #videoanalysis #AI");

  const handlePost = () => {
    if (!newPost.trim()) return;
    
    toast({
      title: "Post published!",
      description: "Your Instagram post has been published successfully.",
    });
    setNewPost("");
  };

  const handleStory = () => {
    toast({
      title: "Story posted!",
      description: "Your Instagram story has been published successfully.",
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        <span className="gradient-text flex items-center gap-2">
          <Instagram className="h-8 w-8" />
          Instagram Dashboard
        </span>
      </h1>

      {/* Account Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-black/20 border-white/10">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{instagramData.profile.followers}</div>
              <div className="text-sm text-gray-400">Followers</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-black/20 border-white/10">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{instagramData.profile.following}</div>
              <div className="text-sm text-gray-400">Following</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-black/20 border-white/10">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{instagramData.profile.posts}</div>
              <div className="text-sm text-gray-400">Posts</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Content */}
      <Card className="bg-black/20 border-white/10 mb-6">
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Button variant="outline" className="flex-1">
              <Camera className="h-4 w-4 mr-2" />
              Photo
            </Button>
            <Button variant="outline" className="flex-1">
              <Video className="h-4 w-4 mr-2" />
              Video
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleStory}>
              <Send className="h-4 w-4 mr-2" />
              Story
            </Button>
          </div>
          
          <Textarea 
            placeholder="Write a caption..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="min-h-24"
          />
          <Input 
            placeholder="Add hashtags..."
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">{2200 - newPost.length} characters remaining</span>
            <Button onClick={handlePost}>
              <Send className="h-4 w-4 mr-2" />
              Post
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {instagramData.recentPosts.map((post) => (
                <div key={post.id} className="p-4 bg-black/30 rounded-lg border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.type}</Badge>
                    <span className="text-sm text-gray-400">{post.time}</span>
                  </div>
                  <p className="mb-3">{post.caption}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {post.comments}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stories Analytics */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle>Active Stories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {instagramData.stories.map((story) => (
                <div key={story.id} className="p-4 bg-black/30 rounded-lg border border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant={story.type === 'poll' ? 'default' : 'secondary'}>
                        {story.type}
                      </Badge>
                      <span className="text-sm text-gray-400">{story.time}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">{story.views.toLocaleString()}</span>
                      <span className="text-gray-400 ml-1">views</span>
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

export default InstagramDashboard;