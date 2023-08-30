import { Graph, Node as AntvNode, Path } from "@antv/x6"
import { Options } from "@antv/x6/lib/graph/options"
import { NodeConfig } from "./graph"

import { JSONGraphNode } from "./transformer/json"
import { Node } from "./graph"

export const default_edge_label = (text: string | null = "") => {
  if (text == null) return null

  return {
    attrs: {
      text: {
        text: text,
      },
    },
    position: {
      distance: 0.4,
    },
  }
}

export const default_edge_attrs = {
  // shape: 'dag-edge',
  attrs: {
    line: {
      strokeWidth: "1",
    },
  },
  zIndex: -1,
}

export const graph_options_defaults: Partial<Options.Manual> = {
  grid: true,

  background: {
    color: "white",
  },

  mousewheel: {
    enabled: true,
    zoomAtMousePosition: true,
    modifiers: "ctrl",
    minScale: 0.5,
    maxScale: 3,
  },

  scroller: {
    enabled: true,
    pannable: true,
  },

  connecting: {
    // https://x6.antv.vision/en/docs/tutorial/intermediate/interacting/#%E8%BF%9E%E7%BA%BF%E8%A7%84%E5%88%99
    allowBlank: false,
    allowMulti: false,
    allowLoop: false,
    allowEdge: false,

    allowNode: false,
    allowPort: true,

    highlight: true,
    snap: true,

    // https://x6.antv.vision/en/examples/showcase/practices#dag
    connector: "algo-connector",
    connectionPoint: "boundary",
    anchor: "top",

    validateMagnet({ e, magnet, view, cell }) {
      // console.log("magnet", e, magnet, view, cell)
      return magnet.getAttribute("port-group") !== "in"
    },
    createEdge(this) {
      return this.createEdge(default_edge_attrs)
    },

    validateEdge({ edge, type, previous }) {
      // console.log("edge data", edge)
      // TODO: only allow (multiple) for decision
      return true
    },

    validateConnection({ edge, sourceMagnet, targetMagnet }) {
      if (sourceMagnet == null || targetMagnet == null) return false

      return sourceMagnet.getAttribute("port-group") == "out" && targetMagnet.getAttribute("port-group") == "in"
    },
  },

  history: {
    enabled: true,
    beforeAddCommand(event: any, args: any) {
      // console.log(event, args);
      // prevent adding/removing tools on hover to be added to history
      if (args.key == "tools") {
        return false
      }
    },
  },
  resizing: {
    enabled: false,
  },
  selecting: {
    enabled: true,
    multiple: false,
  },
}

export function graph_register_defaults(graph: Graph) {
  /*
    // https://x6.antv.vision/en/docs/api/registry/edge-tool
    graph.on('edge:mouseenter', ({ cell }) => {
        // console.log(cell)
        cell.addTools(
            [
                {
                    name: 'button-remove',
                    args: {
                        distance: 30,
                        fill: '#000000'
                    },
                },
            ]
        )
    })
    graph.on('edge:mouseleave', ({ cell }) => {
        setTimeout(() => {
            cell.removeTool('button-remove')
        }, 1500)
    })
    */

  graph.on("node:mouseenter", ({ cell }) => {
    cell.addTools([{ name: "button-remove" }])
  })

  graph.on("node:mouseleave", ({ cell }) => {
    setTimeout(() => {
      cell.removeTool("button-remove")
    }, 1000)
  })

  Graph.registerConnector(
    "algo-connector",
    (s, e) => {
      const offset = 4
      const deltaY = Math.abs(e.y - s.y)
      const control = Math.floor((deltaY / 3) * 2)

      const v1 = { x: s.x, y: s.y + offset + control }
      const v2 = { x: e.x, y: e.y - offset - control }

      return Path.normalize(
        `M ${s.x} ${s.y}
            L ${s.x} ${s.y + offset}
            C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
            L ${e.x} ${e.y}
            `,
      )
    },
    true,
  )
}

const default_port_groups = {
  in: {
    attrs: {
      circle: {
        r: 6,
        stroke: "#6a6a6b",
        magnet: true,
      },
    },
    // markup: {
    //     tagName: 'path',
    //     selector: 'path',
    //     attrs: {
    //         d: "M 0 5 L 6.25 -5 L -6.25 -5 L 0 5",
    //         fill: "#fff",
    //         stroke: "#6a6a6b",
    //         'stroke-width': "1",
    //         magnet: true
    //     }
    // },
    position: "top",
  },
  out: {
    attrs: {
      circle: {
        r: 6,
        stroke: "#6a6a6b",
        magnet: true,
      },
    },
    // markup: {
    //     tagName: 'path',
    //     selector: 'path',
    //     attrs: {
    //         d: "M 0 -5 L 6.25 5 L -6.25 5 L 0 -5",
    //         fill: "#fff",
    //         stroke: "#6a6a6b",
    //         'stroke-width': "1",
    //         magnet: true
    //     }
    // },
    position: "bottom",
  },
}

export function default_node_ports(ports: Array<keyof typeof default_port_groups>) {
  const default_ports = {
    groups: default_port_groups,
    items: [] as { id: string; group: keyof typeof default_port_groups }[],
  }

  for (const port_group of ports) {
    default_ports.items.push({
      id: `${port_group}-1`,
      group: port_group,
    })
  }

  return default_ports
}

export type AntvNodeData = {
  errors?: boolean
  is_stencil_node?: boolean
  nodeData: Node
  nodeConfig: NodeConfig
}

// export interface NodeConfig {
//   label: string
//   data: string | number
//   component: any
//   options?: string[]
// }

const node_html = {
  render(node: AntvNode) {
    const data = node.getData() as AntvNodeData

    return `<div class="node ${data.errors ? "node-has-errors" : ""}">
                <span class="">${data.nodeData.gd.nodeConfig.name ?? "Новый элемент"}</span>
            </div>`
  },
  shouldComponentUpdate(node: AntvNode) {
    return node.hasChanged("data")
  },
}

export const antvMetadata = (nodeData?: JSONGraphNode) => {
  return {
    shape: "html",
    html: node_html,
    width: 180,
    height: 36,
    data: {
      nodeData: { gd: nodeData?.gd },
    },
    ports: default_node_ports(["in", "out"]),
  }
}
