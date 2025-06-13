
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Search, Filter, RotateCcw } from 'lucide-react';

interface FilterProps {
  filters: {
    status: string;
    dateRange: string;
    search: string;
    type: string;
  };
  onFiltersChange: (filters: any) => void;
}

export function InterviewFilters({ filters, onFiltersChange }: FilterProps) {
  const statuses = [
    { value: 'scheduled', label: 'Scheduled', color: 'bg-blue-500' },
    { value: 'active', label: 'Active', color: 'bg-[#00EA64]' },
    { value: 'completed', label: 'Completed', color: 'bg-gray-500' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-500' }
  ];

  const dateRanges = [
    'Today',
    'This Week',
    'This Month',
    'Last 30 Days',
    'Custom Range'
  ];

  const interviewTypes = [
    'Technical',
    'Behavioral',
    'Mixed'
  ];

  const updateFilter = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      status: '',
      dateRange: '',
      search: '',
      type: ''
    });
  };

  return (
    <Card className="bg-[#1B2631] border-gray-700">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg flex items-center">
            <Filter className="h-5 w-5 mr-2 text-[#00EA64]" />
            Filters
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="text-gray-400 hover:text-white"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">
            Search Candidates
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0F1419] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-[#00EA64] focus:outline-none"
            />
          </div>
        </div>

        <Separator className="bg-gray-600" />

        {/* Status Filter */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-3 block">
            Interview Status
          </label>
          <div className="space-y-2">
            {statuses.map((status) => (
              <div
                key={status.value}
                className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
                  filters.status === status.value 
                    ? 'bg-[#00EA64]/10 border border-[#00EA64]' 
                    : 'hover:bg-gray-700'
                }`}
                onClick={() => updateFilter('status', filters.status === status.value ? '' : status.value)}
              >
                <div className={`w-3 h-3 rounded-full ${status.color} mr-3`}></div>
                <span className="text-gray-300 text-sm">{status.label}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-gray-600" />

        {/* Date Range Filter */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-3 block">
            <Calendar className="inline h-4 w-4 mr-1" />
            Date Range
          </label>
          <div className="space-y-2">
            {dateRanges.map((range) => (
              <div
                key={range}
                className={`p-2 rounded cursor-pointer transition-colors text-sm ${
                  filters.dateRange === range 
                    ? 'bg-[#00EA64]/10 border border-[#00EA64] text-white' 
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => updateFilter('dateRange', filters.dateRange === range ? '' : range)}
              >
                {range}
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-gray-600" />

        {/* Interview Type Filter */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-3 block">
            Interview Type
          </label>
          <div className="flex flex-wrap gap-2">
            {interviewTypes.map((type) => (
              <Badge
                key={type}
                variant={filters.type === type ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  filters.type === type 
                    ? 'bg-[#00EA64] text-black hover:bg-[#00EA64]/90' 
                    : 'border-gray-600 text-gray-400 hover:border-[#00EA64] hover:text-white'
                }`}
                onClick={() => updateFilter('type', filters.type === type ? '' : type)}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-3 block">
            Sort By
          </label>
          <select className="w-full p-2 bg-[#0F1419] border border-gray-600 rounded-lg text-white focus:border-[#00EA64] focus:outline-none">
            <option>Date (Newest First)</option>
            <option>Date (Oldest First)</option>
            <option>Candidate Name</option>
            <option>Status</option>
            <option>Duration</option>
          </select>
        </div>
      </CardContent>
    </Card>
  );
}
