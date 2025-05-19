
import React from 'react';
import { ColorData } from '@/types/colorAnalysis';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ColorAnalysisResultsProps {
  data: ColorData;
}

const ColorAnalysisResults: React.FC<ColorAnalysisResultsProps> = ({ data }) => {
  // Map the color names to their actual CSS color values
  const colorMap: Record<string, string> = {
    "Red": "#ff0000",
    "Green": "#00ff00",
    "Blue": "#0000ff",
    "Yellow": "#ffff00",
    "Cyan": "#00ffff",
    "Magenta": "#ff00ff",
    "White": "#ffffff",
    "Black": "#000000",
    "Gray": "#808080",
    "Orange": "#ffa500",
    "Brown": "#a52a2a",
    "Pink": "#ffc0cb",
  };

  // Create a color chip component
  const ColorChip = ({ color }: { color: string }) => (
    <div 
      className="w-4 h-4 rounded-sm inline-block mr-2" 
      style={{ backgroundColor: colorMap[color] || color }}
    />
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Color Distribution</h3>
        <div className="h-72 w-full">
          <ChartContainer config={{}} className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.distribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                  nameKey="color"
                  label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                >
                  {data.distribution.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={colorMap[entry.color] || `hsl(${index * 45}, 70%, 50%)`} 
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Color Breakdown</h3>
        <div className="max-h-64 overflow-y-auto pr-2 space-y-2">
          {data.distribution.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <ColorChip color={item.color} />
                <span>{item.color}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-40 h-2 rounded-full bg-gray-700">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      width: `${item.percentage}%`,
                      backgroundColor: colorMap[item.color] || `hsl(${index * 45}, 70%, 50%)` 
                    }}
                  ></div>
                </div>
                <span className="text-sm">{item.percentage.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Color Insights</h3>
        <div className="bg-black/20 border border-white/10 rounded-md p-4">
          <ul className="list-disc list-inside space-y-2">
            <li>Dominant color: <span className="font-medium">{data.dominant.color}</span> ({data.dominant.percentage.toFixed(1)}%)</li>
            <li>Color mood: {data.mood}</li>
            <li>Color palette consists of {data.distribution.length} main colors</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ColorAnalysisResults;
