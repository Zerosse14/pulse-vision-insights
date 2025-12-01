import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileVideo, Palette, TrendingUp, FileText } from "lucide-react";

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
            <CardTitle className="text-sm font-medium">Transcripts</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67</div>
            <p className="text-xs text-gray-400">Transcripts analyzed</p>
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
            <CardTitle>Analysis Breakdown</CardTitle>
            <CardDescription>Usage by analysis type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-primary" />
                  <span>Color Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-40 h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary w-[55%]"></div>
                  </div>
                  <span className="text-sm">55%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-secondary" />
                  <span>Transcript Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-40 h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-secondary w-[30%]"></div>
                  </div>
                  <span className="text-sm">30%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  <span>Trend Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-40 h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-accent w-[15%]"></div>
                  </div>
                  <span className="text-sm">15%</span>
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
