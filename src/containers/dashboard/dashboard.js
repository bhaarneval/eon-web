import "./dashboard.less";

import React, { Component } from "react";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/styles";

import DashboardTable from "../../components/dashboardTable/dashboardTable";

import {
  DASHBOARD,
  DEPLOYED_CLUSTERS,
  RUNNING_CLUSTERS,
  ACTIVE_SESSIONS,
  INSTANCES
} from "../../constants/constants";

import cloud from "../../assets/cloud.png";
import network from "../../assets/network.png";

const styles = {
  card: {
    width: "23%",
    height: 95,
    borderRadius: "10px"
  },
  cardcontent: {
    height: 65,
    paddingBottom: "0 !important"
  }
};

class Dashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className="headerLabel">{DASHBOARD}</div>
        <div className="flex flex-row space-between dashboardHeader">
          <Card className={classes.card} variant="outlined">
            <CardContent className={classes.cardcontent}>
              <div className="flex flex-row space-evenly cardContent">
                <div className="cardImage cardImageBlue">
                  <img className="img" src={network} />
                </div>
                <div className="flex flex-column cardInfo">
                  <div className="cardInfoNo">05</div>
                  <div className="cardDesc">{DEPLOYED_CLUSTERS}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className={classes.card} variant="outlined">
            <CardContent className={classes.cardcontent}>
              <div className="flex flex-row space-evenly cardContent">
                <div className="cardImage cardImageGreen">
                  <img className="img" src={network} />
                </div>
                <div className="flex flex-column cardInfo">
                  <div className="cardInfoNo">24</div>
                  <div className="cardDesc">{RUNNING_CLUSTERS}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className={classes.card} variant="outlined">
            <CardContent className={classes.cardcontent}>
              <div className="flex flex-row space-evenly cardContent">
                <div className="cardImage cardImageOrange">
                  <img className="img" src={cloud} />
                </div>
                <div className="flex flex-column cardInfo">
                  <div className="cardInfoNo">03</div>
                  <div className="cardDesc">{ACTIVE_SESSIONS}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className={classes.card} variant="outlined">
            <CardContent className={classes.cardcontent}>
              <div className="flex flex-row space-evenly cardContent">
                <div className="cardImage cardImageBlue">
                  <img className="img" src={cloud} />
                </div>
                <div className="flex flex-column cardInfo">
                  <div className="cardInfoNo">05</div>
                  <div className="cardDesc">{INSTANCES}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <DashboardTable />
      </div>
    );
  }
}

Dashboard.propTypes = {
  history: PropTypes.object,
  classes: PropTypes.object
};

export default withStyles(styles)(Dashboard);
