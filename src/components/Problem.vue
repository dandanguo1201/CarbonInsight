<template>
  <div class="problem">
    <div class="title">
      <div>Questions</div>
      <div>Frequently Asked Questions</div>
    </div>
    <div class="prolist">
      <div v-for="(item, index) in list" :key="index">
        <a-row class="prolist_line">
          <!-- <a-col :span="1">
            <div class="number">0{{ index + 1 }}</div>
          </a-col> -->
          <a-col :span="22">
            <div class="content">
              <div
                class="prolist_title"
                :class="item.check ? 'open' : 'close'"
                @click="item.check = !item.check"
              >
                {{ item.btitle }}
              </div>
              <div
                class="prolist_content"
                v-html="item.content"
                v-show="item.check"
              ></div>
            </div>
          </a-col>
          <a-col :span="2">
            <button
              class="fold_img"
              aria-label="indexImg"
              @click="item.check = !item.check"
            >
              <img v-if="item.check" src="../assets/index_up.svg" alt="" />
              <img v-else src="../assets/index_down.svg" alt="" />
            </button>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>
<script>
import number1 from "@/assets/1.svg";
import number2 from "@/assets/2.svg";
import number3 from "@/assets/3.svg";
import number4 from "@/assets/4.svg";
import number5 from "@/assets/5.svg";
import up from "@/assets/up.svg";
import down from "@/assets/down.svg";

export default {
  name: "Prblem",
  data() {
    return {
      list: [
        {
          img: number1,
          btitle: "What can I do on Carbon Insight?",
          content:
            "<p>Carbon Insight provides interactive maps and dashboards to show carbon emission and sink from different regions of the world and in different timescales. You can observe and compare, for the first time, near-live daily carbon emissions in different countries. </p><p>In addition, you can conduct more insightful analyses. For example, you can observe variations in carbon emissions in different regions and COVID-19 cases accumulate. You can also track how per capita GDP and per capita emission of different countries evolve overtime.</p>",
          check: false,
        },
        {
          img: number2,
          btitle: "What does the data on Carbon Insight Come from?",
          content:
            " <p>Carbon Insight compute all of our data from publicly available data.</p><p>Global Carbon data are provided by <a target='_blank' href='https://carbonmonitor.org/' >Carbon Monitor</a>, an international initiative led by research organizations, including Tsinghua University, that provides regularly updated, science-based estimates of anthropogenic CO2 emissions and sinks. The dataset displays variations of CO2 emissions from different aspects of human activities since January 1st 2019 at national level with near-global coverage.</p><p>Carbon Insight also links emissions with two socioeconomic factors: COVID-19 and GDP. This part, in addition, uses data from <a target='_blank' href='https://covidtracker.bsg.ox.ac.uk/' >OxCGRT</a>, <a target='_blank' href='https://edgar.jrc.ec.europa.eu/index.php/dataset_ghg60' >EDGAR</a> and <a target='_blank' href='https://data.worldbank.org/' >World Bank</a></p>",
          check: false,
        },
        {
          img: number3,
          btitle: "How often does Carbon Insight update its data?",
          content:
            "<p>Carbon Insight provides one of the world's most up-to-date carbon dataset. Towards the end of each month, you are able to find data of global carbon emissions from the previous month. Given the complexity of the data from different sectors, the specific date of data updates would also vary.</p>",
          check: false,
        },
        {
          img: number4,
          btitle: "Who can access data on Carbon Insight and how to use them?",
          content:
            " <p>Carbon Insight is an open and free tool that allows anyone to access global carbon data.</p><p>Researchers could use the inventory to facilitate their study on climate change and carbon reductions. Policymakers could find information about carbon emissions structures of different countries and changes overtime, which would help them understand impacts of different policies on the climate.</p><p>We do not, of course, confine the use of data to the academia or decision makers. We encourage anyone who want to learn more about this universal problem problem of climate change to explore our tool and use it in all kinds of innovative ways.</p><p class='license'>License: <a target='_blank' href='https://data.worldbank.org/' >Open Use of Data Agreement v1.0</a></p>",
          check: false,
        },
        {
          img: number5,
          btitle: "How can I contribute to Carbon Insight?",
          content:
            " <p>We strive to improve the inclusiveness and accessibility of our datasets. Should you have any questions or suggestions, please don’t hesitate to let us know!</p><p>We are also open to collaborate with more organizations or research groups who would love to make their data visualized and more easily accessible with AI and ML tools.</p><p>Please reach out to us though: carboninsight@microsoft.com</p>",
          check: false,
        },
      ],
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.problem {
  box-sizing: border-box;
  width: 100%;
  max-width: 1464px;
  padding: 0 40px 0;
  margin: 0 auto;
  .title {
    width: 100%;
    padding-top: 84px;
    color: #000000;
    text-align: center;
    div:first-child {
      font-weight: 400;
      font-size: 18px;
      line-height: 16px;
      margin-top: 6px;
    }
    div:last-child {
      font-weight: bold;
      // font-size: 32px;
      // line-height: 69px;
      font-weight: 700;
      font-size: 44px;
      line-height: 69px;
      margin-bottom: 72px;
    }
  }
  .prolist {
    box-sizing: border-box;
    overflow: hidden;
    margin-top: 79px;
    margin: 0 auto;
    max-width: 1024px;
    .prolist_line {
      position: relative;
      display: flex;
      align-items: flex-start;
      cursor: pointer;
      .number {
        font-size: 24px;
        font-weight: bold;
        color: #000000;
        margin-top: 8px;
      }
      .content {
        // margin-left: 40px;
        margin-bottom: 37px;
        /deep/ a {
          color: #0067b8;
        }
        /deep/ a:hover {
          border-bottom: 1px solid #0067b8;
        }
      }
      .prolist_title {
        display: inline-block;
        box-sizing: border-box;
        // font-size: 20px;
        // line-height: 54px;
        font-weight: 700;
        font-size: 28px;
        line-height: 54px;
        font-weight: bold;
        color: #000000;
        cursor: pointer;
      }
      .prolist_content {
        // font-size: 18px;
        font-size: 32x;
        line-height: 27px;
        word-break: break-word;
        padding-right: 20px;
        padding-top: 10px;
        font-weight: 400;
        /deep/ p:last-child {
          margin-bottom: 0;
        }
      }
      .fold_img {
        margin-top: 17px;
        margin: 0 auto;
        height: 54px;
        float: right;
        img {
          width: 16px;
          height: 9.41px;
        }
      }
    }
  }
  @media screen and (max-width: 1920px) {
  }
  @media screen and (max-width: 639px) {
    padding: 0 20px;
    .title div {
      margin-top: 70px;
    }
    .prolist {
      margin: 64px 0 auto 0;
      .prolist_line .content {
        // margin-left: 25px;
        margin-right: 15px;
      }
      .prolist_content {
        padding-top: 10px;
        padding-right: 0;
      }
      .prolist_line .prolist_title {
        line-height: 30px;
      }
    }
  }
}
</style>
