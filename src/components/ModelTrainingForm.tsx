
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

const ModelTrainingForm = () => {
  const [algorithm, setAlgorithm] = useState('randomforest');
  const [datasetId, setDatasetId] = useState('inventory_2023');
  const [includeWeather, setIncludeWeather] = useState(true);
  const [includeSeasonal, setIncludeSeasonal] = useState(true);
  const [trainingPercent, setTrainingPercent] = useState(80);
  const [isTraining, setIsTraining] = useState(false);

  const handleTrainModel = () => {
    setIsTraining(true);
    
    // Simulate model training delay
    setTimeout(() => {
      setIsTraining(false);
      toast.success('Model trained successfully!', {
        description: `${algorithm} model trained with ${trainingPercent}% of data.`,
      });
    }, 2000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Train Prediction Model</CardTitle>
        <CardDescription>
          Configure and train a machine learning model for supply chain predictions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="dataset">Select Dataset</Label>
            <Select value={datasetId} onValueChange={setDatasetId}>
              <SelectTrigger>
                <SelectValue placeholder="Select dataset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inventory_2023">Inventory Data 2023</SelectItem>
                <SelectItem value="sales_2022_2023">Sales Data 2022-2023</SelectItem>
                <SelectItem value="supply_chain_full">Full Supply Chain Data</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="algorithm">Algorithm</Label>
            <Select value={algorithm} onValueChange={setAlgorithm}>
              <SelectTrigger>
                <SelectValue placeholder="Select algorithm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="randomforest">Random Forest</SelectItem>
                <SelectItem value="xgboost">XGBoost</SelectItem>
                <SelectItem value="lstm">LSTM Neural Network</SelectItem>
                <SelectItem value="prophet">Prophet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="weather-data">Include Weather Data</Label>
            <Switch 
              id="weather-data" 
              checked={includeWeather}
              onCheckedChange={setIncludeWeather}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="seasonal-patterns">Include Seasonal Patterns</Label>
            <Switch 
              id="seasonal-patterns" 
              checked={includeSeasonal}
              onCheckedChange={setIncludeSeasonal}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="train-percent">Training Data Split</Label>
              <span className="text-sm text-muted-foreground">{trainingPercent}%</span>
            </div>
            <Slider 
              defaultValue={[80]} 
              max={95}
              min={50}
              step={5}
              onValueChange={(value) => setTrainingPercent(value[0])}
            />
          </div>

          <Button 
            onClick={handleTrainModel}
            disabled={isTraining}
            className="w-full bg-green-600 hover:bg-green-700"
            type="button"
          >
            {isTraining ? (
              <>
                <span className="material-icons-outlined animate-spin mr-2">refresh</span>
                Training...
              </>
            ) : (
              'Train Model'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ModelTrainingForm;
