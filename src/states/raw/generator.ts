import { HomeAssistant } from "custom-card-helpers";
import { getEntityStateWatts } from "../utils/getEntityStateWatts";
import { PowerFlowCardPlusConfig } from "../../power-flow-card-plus-config";

/**
 * Gets the generator's power consumption state in watts.
 */
export const getGeneratorConsumptionState = (hass: HomeAssistant, config: PowerFlowCardPlusConfig): number => {
  const entity = config.entities.generator?.entity;
  return getEntityStateWatts(hass, entity);
};
