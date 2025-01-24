/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import { any, assign, boolean, integer, number, object, optional, string } from "superstruct";
import memoizeOne from "memoize-one";
import { gridSchema } from "./grid";
import { batterySchema } from "./battery";
import { solarSchema } from "./solar";
import { individualSchema } from "./individual";
import { nonFossilSchema } from "./fossil_fuel_percentage";
import { homeSchema } from "./home";
import { displayZeroLinesSchema } from "./display_zero_lines";
import { mdiBattery90, mdiBatteryHigh, mdiCog, mdiHome, mdiLeaf, mdiTransmissionTower, mdiWeatherSunny, mdiPowerGenerator } from "@mdi/js"; // Added mdiPowerGenerator
import { generatorSchema } from "./generator"; // Import generatorSchema
import { supplySchema } from "./supply"; // Import supplySchema

const baseLovelaceCardConfig = object({
  type: string(),
  view_layout: any(),
});

export const cardConfigStruct = assign(
  baseLovelaceCardConfig,
  object({
    title: optional(string()),
    theme: optional(string()),
    dashboard_link: optional(string()),
    dashboard_link_label: optional(string()),
    second_dashboard_link: optional(string()),
    second_dashboard_link_label: optional(string()),
    inverted_entities: optional(any()),
    w_decimals: optional(integer()),
    kw_decimals: optional(integer()),
    min_flow_rate: optional(number()),
    max_flow_rate: optional(number()),
    min_expected_power: optional(number()),
    max_expected_power: optional(number()),
    watt_threshold: optional(number()),
    clickable_entities: optional(boolean()),
    transparency_zero_lines: optional(number()),
    greyout_zero_lines: optional(boolean()),
    display_zero_lines: optional(any()),
    use_new_flow_rate_model: optional(boolean()),
    full_size: optional(boolean()),
    style_ha_card: optional(any()),
    style_card_content: optional(any()),
    disable_dots: optional(boolean()),
    entities: object({
      battery: optional(any()),
      grid: optional(any()),
      solar: optional(any()),
      home: optional(any()),
      fossil_fuel_percentage: optional(any()),
      individual: optional(any()),
      generator: optional(any()), // Added generator entity
      supply: optional(any()),    // Added supply entity
    }),
  })
);

export const generalConfigSchema = [
  {
    name: "title",
    label: "Title",
    selector: { text: {} },
  },
] as const;

export const entitiesSchema = memoizeOne((localize) => [
  {
    name: "entities",
    type: "grid",
    column_min_width: "400px",
    schema: [
      {
        title: localize("editor.grid"),
        name: "grid",
        type: "expandable",
        iconPath: mdiTransmissionTower,
        schema: gridSchema,
      },
      {
        title: localize("editor.solar"),
        name: "solar",
        type: "expandable",
        iconPath: mdiWeatherSunny,
        schema: solarSchema,
      },
      {
        title: localize("editor.battery"),
        name: "battery",
        type: "expandable",
        iconPath: mdiBatteryHigh,
        schema: batterySchema,
      },
      {
        title: localize("editor.generator"),
        name: "generator",
        type: "expandable",
        iconPath: mdiPowerGenerator, // Icon for Generator
        schema: generatorSchema,     // Generator schema
      },
      {
        title: localize("editor.supply"),
        name: "supply",
        type: "expandable",
        iconPath: mdiCog, // Use an appropriate icon for Supply
        schema: supplySchema, // Supply schema
      },
      {
        title: localize("editor.fossil_fuel_percentage"),
        name: "fossil_fuel_percentage",
        type: "expandable",
        iconPath: mdiLeaf,
        schema: nonFossilSchema,
      },
      {
        title: localize("editor.home"),
        name: "home",
        type: "expandable",
        iconPath: mdiHome,
        schema: homeSchema,
      },
    ],
  },
]);

export const individualDevicesSchema = memoizeOne((localize) => [
  {
    name: "entities",
    type: "grid",
    column_min_width: "400px",
    schema: [
      {
        title: `${localize("editor.individual")} 1`,
        name: "individual1",
        type: "expandable",
        schema: individualSchema,
      },
      {
        title: `${localize("editor.individual")} 2`,
        name: "individual2",
        type: "expandable",
        schema: individualSchema,
      },
    ],
  },
]);

export const advancedOptionsSchema = memoizeOne((localize, displayZeroLinesMode: string) => [
  {
    type: "grid",
    column_min_width: "200px",
    schema: [
      {
        name: "dashboard_link",
        label: "Dashboard Link",
        selector: { navigation: {} },
      },
      {
        name: "dashboard_link_label",
        label: "Dashboard Link Label",
        selector: { text: {} },
      },
      {
        name: "w_decimals",
        label: "Watt Decimals",
        selector: { number: { mode: "box", min: 0, max: 5, step: 1 } },
      },
      {
        name: "kw_decimals",
        label: "kW Decimals",
        selector: { number: { mode: "box", min: 0, max: 5, step: 1 } },
      },
      {
        name: "max_flow_rate",
        label: "Max Flow Rate (Sec/Dot)",
        selector: { number: { mode: "box", min: 0, max: 1000000, step: 0.01 } },
      },
      {
        name: "min_flow_rate",
        label: "Min Flow Rate (Sec/Dot)",
        selector: { number: { mode: "box", min: 0, max: 1000000, step: 0.01 } },
      },
      {
        name: "max_expected_power",
        label: "Max Expected Power (in Watts)",
        selector: { number: { mode: "box", min: 0, max: 1000000, step: 0.01 } },
      },
      {
        name: "min_expected_power",
        label: "Min Expected Power (in Watts)",
        selector: { number: { mode: "box", min: 0, max: 1000000, step: 0.01 } },
      },
      {
        name: "watt_threshold",
        label: "Watt to Kilowatt Threshold",
        selector: { number: { mode: "box", min: 0, max: 1000000, step: 1 } },
      },

      {
        name: "clickable_entities",
        label: "Clickable Entities",
        selector: { boolean: {} },
      },
      {
        name: "disable_dots",
        label: "Disable Moving Dots",
        selector: { boolean: {} },
      },
      {
        name: "use_new_flow_rate_model",
        label: "New Flow Model?",
        selector: { boolean: {} },
      },
    ],
  },
  {
    type: "expandable",
    title: localize("editor.display_zero_lines"),
    schema: [...displayZeroLinesSchema(localize, displayZeroLinesMode)],
  },
]);
