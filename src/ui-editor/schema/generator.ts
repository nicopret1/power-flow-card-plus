/* eslint-disable import/extensions */
import {
   getEntityCombinedSelectionSchema,
   getEntitySeparatedSelectionSchema,
   secondaryInfoSchema,
   getBaseMainConfigSchema,
   customColorsSchema,
   tapActionSchema,
 } from "./_schema-base";
 import localize from "../../localize/localize";
 
 const mainSchema = {
   ...getBaseMainConfigSchema("generator"),
   schema: [
     ...getBaseMainConfigSchema("generator").schema,
     {
       name: "invert_state",
       label: "Invert State",
       selector: { boolean: {} },
     },
     {
       name: "color_value",
       label: "Color of Value",
       selector: { boolean: {} },
     },
   ],
 };
 
 export const generatorSchema = [
   getEntityCombinedSelectionSchema(),
   getEntitySeparatedSelectionSchema(),
   mainSchema,
   customColorsSchema,
   {
     title: localize("editor.secondary_info"),
     name: "secondary_info",
     type: "expandable",
     schema: secondaryInfoSchema,
   },
   {
     title: localize("editor.tap_action"),
     name: "",
     type: "expandable",
     schema: tapActionSchema,
   },
 ] as const;