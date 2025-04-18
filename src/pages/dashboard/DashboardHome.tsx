import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileVideo, Palette, TrendingUp, Users } from "lucide-react";
import { Youtube, Instagram, Twitter, Facebook } from "lucide-react";

const DashboardHome = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to SocialPulse Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-black/20 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
            <FileVideo className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-gray-400">+12 from last month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-black/20 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Color Analysis</CardTitle>
            <Palette className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95</div>
            <p className="text-xs text-gray-400">Analyses completed</p>
          </CardContent>
        </Card>
        
        <Card className="bg-black/20 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trending Videos</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-gray-400">Currently trending</p>
          </CardContent>
        </Card>
        
        <Card className="bg-black/20 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">348</div>
            <p className="text-xs text-gray-400">+26% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 mt-8">
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your recent video analysis activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/20 p-2">
                  <FileVideo className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Product Review Analysis</p>
                  <p className="text-sm text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/20 p-2">
                  <Palette className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Color Scheme Analysis</p>
                  <p className="text-sm text-gray-400">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/20 p-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Trend Report Generated</p>
                  <p className="text-sm text-gray-400">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle>Platform Distribution</CardTitle>
            <CardDescription>Videos analyzed by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Youtube className="h-4 w-4 text-red-500" />
                  <span>YouTube</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-40 h-2 rounded-full bg-gray-700">
                    <div className="h-2 rounded-full bg-red-500 w-[65%]"></div>
                  </div>
                  <span className="text-sm">65%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-pink-500" />
                  <span>Instagram</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-40 h-2 rounded-full bg-gray-700">
                    <div className="h-2 rounded-full bg-pink-500 w-[20%]"></div>
                  </div>
                  <span className="text-sm">20%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Twitter className="h-4 w-4 text-blue-400" />
                  <span>Twitter</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-40 h-2 rounded-full bg-gray-700">
                    <div className="h-2 rounded-full bg-blue-400 w-[10%]"></div>
                  </div>
                  <span className="text-sm">10%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Facebook className="h-4 w-4 text-blue-600" />
                  <span>Facebook</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-40 h-2 rounded-full bg-gray-700">
                    <div className="h-2 rounded-full bg-blue-600 w-[5%]"></div>
                  </div>
                  <span className="text-sm">5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
