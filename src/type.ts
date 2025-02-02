import { TemplateResult } from "lit";
import { ActionConfig } from "custom-card-helpers";

export type ComboEntity = {
  consumption: string;
  production: string;
};

export type SecondaryInfoType = {
  entity?: string;
  unit_of_measurement?: string;
  icon?: string;
  display_zero?: boolean;
  unit_white_space?: boolean;
  display_zero_tolerance?: number;
  color_value?: boolean | "production" | "consumption";
  template?: string;
  accept_negative?: boolean;
  decimals?: number;
  tap_action?: ActionConfig;
};

export interface BaseConfigEntity {
  entity?: string | ComboEntity; // Make this optional
  name?: string;
  icon?: string;
  color?: ComboEntity | string;
  color_icon?: boolean | string;
  display_state?: "two_way" | "one_way" | "one_way_no_zero";
  display_zero_tolerance?: number;
  unit_of_measurement?: string;
  unit_white_space?: boolean;
  use_metadata?: boolean;
  secondary_info?: SecondaryInfoType;
  invert_state?: boolean;
  tap_action?: ActionConfig;
}

export type GridPowerOutage = {
  entity: string;
  state_alert?: string;
  label_alert?: string;
  icon_alert?: string;
  entity_generator?: string;
};

export type IndividualDeviceType = BaseConfigEntity & {
  entity: string;
  color?: string;
  color_icon?: boolean;
  inverted_animation?: boolean;
  display_zero?: boolean;
  display_zero_state?: boolean;
  color_value?: boolean;
  color_label?: boolean;
  calculate_flow_rate?: boolean;
  use_metadata?: boolean;
  decimals?: number;
  show_direction?: boolean;
};

export type EntityType = "battery" | "grid" | "solar" | "individual1" | "individual2" | "home" | "fossil_fuel_percentage";

export type TemplatesObj = {
  gridSecondary: string | undefined;
  solarSecondary: string | undefined;
  homeSecondary: string | undefined;
  generatorSecondary?: string | undefined; // Added generator
  supplySecondary?: string | undefined;    // Added supply
  individual: (string | undefined)[];
  nonFossilFuelSecondary: string | undefined;
};

export type HomeSources = {
  battery: {
    value: number;
    color: string;
  };
  solar: {
    value: number;
    color: string;
  };
  grid: {
    value: number;
    color: string;
  };
  gridNonFossil: {
    value: number;
    color: string;
  };
};

export type NewDur = {
  batteryGrid: number;
  batteryToHome: number;
  gridToHome: number;
  solarToBattery: number;
  solarToGrid: number;
  solarToHome: number;
  individual: number[];
  nonFossil: number;
};

export type GridObject = {
  entity: string | ComboEntity | undefined;
  has: boolean;
  hasReturnToGrid: boolean;
  state: {
    fromGrid: number | null;
    toGrid: number | null;
    toBattery: number | null;
    toHome: number | null;
    fromGenerator?: number | null; // Add this for the generator's contribution
  };
  powerOutage: {
    has: boolean;
    isOutage: boolean;
    icon: string;
    name: string | TemplateResult<1>;
    entityGenerator?: string;
  };
  icon: string;
  name: string;
  mainEntity: string | undefined;
  color: {
    fromGrid?: string;
    toGrid?: string;
    fromGenerator?: string; // Add color handling for the generator
    icon_type?: boolean | "production" | "consumption";
    circle_type?: boolean | "production" | "consumption";
  };
  tap_action?: ActionConfig;
  secondary: {
    entity?: string;
    decimals?: number;
    template?: string;
    has: boolean;
    state: string | number | null;
    icon?: string;
    unit?: string;
    unit_white_space?: boolean;
    accept_negative?: boolean;
    tap_action?: ActionConfig;
    color?: {
      type?: boolean | "production" | "consumption";
    };
  };
};

export type SupplyObject = {
  state: {
    fromGrid: number;        // Power from the Grid to Supply (default to 0 if undefined)
    fromGenerator: number;   // Power from the Generator to Supply (default to 0 if undefined)
    toGrid: number;          // Power exported to the Grid from Supply (default to 0 if undefined)
    totalSupply: number;     // Total supply (fromGrid + fromGenerator)
  };
  name: string;              // Displayed name of the supply entity
  color?: {
    grid?: string;           // Color for Grid contribution
    generator?: string;      // Color for Generator contribution
    supply?: string;         // Color for Supply circle
    toGrid?: string;         // Color for export to Grid
  };
  icon?: string;             // Icon for the supply circle
};

export type OfflineStr = "unavailable" | "unknown";
export const offlineStr = ["unavailable", "unknown"];
