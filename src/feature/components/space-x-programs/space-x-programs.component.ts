import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { isNull, isEmpty } from 'lodash';
import { DataServiceService } from '../../services/data-service.service';

export interface IProgramDetail {
  imageLink: string;
  name: string;
  id: number;
  missionId: Array<string>;
  launchYear: number;
  launchSuccess: boolean;
  landSuccess: boolean;
}

@Component({
  selector: 'app-space-x-programs',
  templateUrl: './space-x-programs.component.html',
  styleUrls: ['./space-x-programs.component.less']
})
export class SpaceXProgramsComponent implements OnInit {
  selectedFilters = {
    launchYear: null,
    launchSuccess: null,
    landingSuccess: null
  };
  loading = true;
  programsList: IProgramDetail[] = [];
  launchYearFilterOptions: Array<number> = [];

  constructor(
    private dataService: DataServiceService,
    private route: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getlaunchYearFilters();
    this.activatedRoute.queryParamMap.subscribe((param) => {
      if (isEmpty(param['params'])) {
        this.getAllProgramsData();
      } else {
        this.getSelectedFiltersData(param);
      }
    });
  }

  /**
   * Filter values for Launch year, starting from year 2006 till 2020
   */
  getlaunchYearFilters() {
    const currentYear = new Date().getFullYear();
    for (let year = 2006; year < currentYear; year++) {
      this.launchYearFilterOptions.push(year);
    }
  }

  /**
   * To fetch all spaceX programs list
   */
  getAllProgramsData() {
    this.dataService.getAllPrograms()
      .pipe(finalize(() => {
        this.loading = false;
      }))
      .subscribe(data => {
        this.programsList = this.processProgramResponse(data);
      }, error => {
        console.log('HTTP Error', error);
      });
  }

  /**
   *
   * @param data
   * Update Selected filter object
   * @param filterType
   * Updated URL when filter is applied
   */
  applyFilter(data, filterType) {
    this.programsList = [];
    this.loading = true;
    if (isNull(this.selectedFilters[filterType]) || this.selectedFilters[filterType] !== data) {
      this.selectedFilters[filterType] = data;
    } else {
      this.selectedFilters[filterType] = null;
    }
    if (Object.values(this.selectedFilters).every((filter) => isNull(filter))) {
      this.route.navigate(['/spaceX']);
    } else {
      this.route.navigate(['/spaceX'], {
        queryParams: {
          launchYear: !isNull(this.selectedFilters.launchYear) ? this.selectedFilters.launchYear : 'All',
          launchSuccess: !isNull(this.selectedFilters.launchSuccess) ? this.selectedFilters.launchSuccess : 'All',
          landingSuccess: !isNull(this.selectedFilters.landingSuccess) ? this.selectedFilters.landingSuccess : 'All'
        }
      });
    }
  }

  /**
   *
   * @param routeParam
   * To fetch spaceX programs based on selected filters
   */
  getSelectedFiltersData(routeParam: any) {

    this.selectedFilters.launchYear = routeParam.get('launchYear') === 'All' ? null : Number(routeParam.get('launchYear'));
    this.selectedFilters.launchSuccess = routeParam.get('launchSuccess') === 'All' ? null :
      (routeParam.get('launchSuccess') === 'true' ? true : false);
    this.selectedFilters.landingSuccess = routeParam.get('landingSuccess') === 'All' ? null :
      (routeParam.get('landingSuccess') === 'true' ? true : false);

    const filterObj = {
      launch_year: this.selectedFilters.launchYear,
      launch_success: this.selectedFilters.launchSuccess,
      land_success: this.selectedFilters.landingSuccess
    };

    this.dataService.getSelectedPrograms(filterObj)
      .pipe(finalize(() => {
        this.loading = false;
      }))
      .subscribe(data => {
        this.programsList = this.processProgramResponse(data);
      }, error => {
        console.log('HTTP Error', error);
      });
  }

  /**
   *
   * @param programRes
   * Tranform API response to desired interface
   */
  processProgramResponse(programRes: any): IProgramDetail[] {
    const programDetails = [] as IProgramDetail[];
    programRes.forEach((res) => {
      const productStatusObj = {
        name: res.mission_name,
        id: res.flight_number,
        missionId: res.mission_id,
        launchYear: res.launch_year,
        launchSuccess: res.launch_success,
        landSuccess: res.rocket.first_stage.cores[0].land_success,
        imageLink: res.links.mission_patch_small
      } as IProgramDetail;
      programDetails.push(productStatusObj);
    });
    return programDetails;
  }
}
