import "./style.css"
import "aframe"
import {THREE} from "aframe"

document.addEventListener("DOMContentLoaded", async () => {
  const scene = document.getElementsByTagName("a-scene")[0]
  const camera = document.getElementsByTagName("a-camera")[0]

  createGround(scene)

  document.addEventListener("keydown", (e) => {
    const pos = getPosition(camera)
    if (e.key === "q") {
      pos.y += 0.1
    } else if (e.key === "e") {
      pos.y -= 0.1
    }
  })

  // クリック時ブロックの設置
  document.addEventListener("click", function (event) {
    const box = event.target as HTMLElement
    if (box.tagName !== "A-BOX") {
      return
    }
    const intersection:THREE.Intersection = (event.detail as unknown as {intersection: THREE.Intersection}).intersection
    const pos = getPosition(box)

    if (intersection && intersection.face) {
      const normal = intersection.face.normal
      // ブロックの設置
      scene.appendChild(createBox(pos.x+normal.x, pos.y+normal.y, pos.z+normal.z, "#4CC3D9"))
    }
  })
})

// 地面作る
function createGround(scene: Element) {
  for (let j = -20; j < 20; j++) {
    for (let i = -10; i < 10; i++) {
      scene.appendChild(createBox(i, 0, j))
    }
  }
}

// 指定positionにboxを設置
function createBox(x:number, y:number, z:number, color:string="green") {
  const box = document.createElement("a-box")
  box.setAttribute("position", `${x} ${y} ${z}`)
  box.setAttribute("rotation", "0")
  box.setAttribute("color", color)

  // ボーダー用のbox
  const outlineBox = document.createElement("a-box")
  outlineBox.setAttribute("scale", "1.05 1.05 1.05")
  outlineBox.setAttribute("material", "shader: flat;color: black;side: back")
  box.appendChild(outlineBox)

  return box
}

function getPosition(e:Element) {
  return e.getAttribute("position") as unknown as {x:number; y:number; z:number}
}