import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ChartComponent} from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('incomeChart') incomeChart: ChartComponent;
  @ViewChild('salesChart') salesChart: ChartComponent;
  @ViewChild('transactionsChart') transactionsChart: ChartComponent;
  @ViewChild('commissionChart') commissionChart: ChartComponent;
  @ViewChild('financeChart') financeChart: ChartComponent;
  @ViewChild('countryChart') countryChart: ChartComponent;

  constructor() {
  }

  generateDayWiseTimeSeries(e, t, a) {
    let r = 0;
    let n = [];
    for (; r < t;) {
      const o = e, i = Math.floor(Math.random() * (a.max - a.min + 1)) + a.min;
      n.push([o, i]);
      e += 864e5;
      r++;
    }
    return n;
  }

  ngAfterViewInit() {
    const object = {
      series: [
        {
          name: 'South',
          data: this.generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60
          })
        }
      ],
      chart: {
        type: 'area',
        height: 100,
        toolbar: {show: false},
        sparkline: {
          enabled: true
        }
      },
      grid: {
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8,
        }
      },
    };

    const clone = JSON.parse(JSON.stringify(object));
    clone.chart.type = 'line';
    clone.chart.height = 150;
    // clone.chart.toolbar.show = true;
    // clone.chart.sparkline.enabled = false;
    // clone.grid.padding = { top: 10, right: 10, bottom: 10, left: 10 };

    Object.assign(this.incomeChart, object, {colors: ['#e94e48']});
    Object.assign(this.commissionChart, object, {colors: ['#956fbc']});
    Object.assign(this.salesChart, object, {colors: ['#fee4a3']});
    Object.assign(this.transactionsChart, object, {colors: ['#6bc6b3']});

    Object.assign(this.financeChart, clone, {colors: ['#58acf7']});
    Object.assign(this.countryChart, clone, {colors: ['#5dc188']});
  }

  ngOnInit(): void {
  }

}
