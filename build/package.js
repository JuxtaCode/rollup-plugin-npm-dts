/* eslint-disable */
import { camelCase, upperFirst } from "lodash";
import pkg from "../package.json";

const formatModule = name => upperFirst(camelCase(name.indexOf("@") !== -1 ? name.split("/")[1] : name));
const yearRange = (date) => new Date().getFullYear() === +date ? date : `${date} - ${new Date().getFullYear()}`;
const year = yearRange(pkg.since || new Date().getFullYear());

const name = formatModule(pkg.name);
const deps = pkg.dependencies;
const peer = pkg.peerDependencies;
const external = Object.keys(deps).concat(Object.keys(peer));

const globals = Object.fromEntries(external.map(key => [key, formatModule(key)]));

export { name, deps, external, globals, year, pkg, formatModule };

