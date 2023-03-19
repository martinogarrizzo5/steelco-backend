import React from "react";
import axios, { AxiosError } from "axios";
import { AxisOptions, Chart } from "react-charts";
import ReactDOM from "react-dom";

type DailyStars = {
    date: Date,
    stars: number,
  }
  
  type Series = {
    label: string,
    data: DailyStars[]
  }
  
  const data: Series[] = [
    {
      label: 'React Charts',
      data: [
        {
          date: new Date(),
          stars: 202123,
        }
        // ...
      ]
    },
    {
      label: 'React Query',
      data: [
        {
          date: new Date(),
          stars: 10234230,
        }
        // ...
      ]
    },
    {
      label: 'React Charts',
      data: [
        {
          date: new Date(),
          stars: 202123,
        }
        // ...
      ]
    }
  ]
  
function InjuriesScreen (){
    
    const primaryAxis = React.useMemo(
        (): AxisOptions<DailyStars> => ({
          getValue: datum => datum.date,
        }),
        []
      )
    
      const secondaryAxes = React.useMemo(
        (): AxisOptions<DailyStars>[] => [
          {
            getValue: datum => datum.stars,
          },
        ],
        []
      )
    
      return (
        <><div>
              <Chart
                  options={{
                      data,
                      primaryAxis,
                      secondaryAxes,
                  }} />
          </div>
          <div>
                  <p>porcamandoona</p>
              </div></>
      )
}

export default InjuriesScreen