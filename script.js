class Node{
    constructor(value){
        this.value = value
        this.edgesList = []
    }

    connect(node){
        this.edgesList.push(node)
    }

    getAdjacentNodes(){
        return this.edgesList
    }

}

class Graph{
    constructor(nodes){
        this.nodes = [...nodes]
    }

    addNode(node){
        this.nodes.push(node)
    }

    shortestPath(start, end){
        let prev = this.bfs(start)

        return this.reconstructPath(start, end, prev)
    }

    reconstructPath(start, end, prev){
        let path = []
        for(let at = end; at != null; at = prev[at.value]){
            path.push(at.value)
        }
        path.reverse()

        if(path[0] == start.value){
            return path
        }
        return []
    }

    bfs(start) {
        let visited = new Set()
        let queue = []
        let prev = {}
      
        visited.add(start)
        queue.push(start)
      
        while (queue.length > 0) {
          let node = queue.shift()
          
          for (let neighbor of node.getAdjacentNodes()) {
            if (!visited.has(neighbor)) {
              visited.add(neighbor)
              queue.push(neighbor)
              prev[neighbor.value] = node
            }
          }
        }
        return prev
      }
}

function generateChessBoard(){
    let squares = []

    for(let x = 0; x < 8; x++){
        for(let y = 0; y < 8; y++){
            let square = new Node([x, y])
            squares.push(square)
        }
    }

    //possible moves
    for (let square of squares) {
        for(dx of [-2, -1, 1, 2]){
            for(dy of [-2, -1, 1, 2]){
                if(Math.abs(dx) !== Math.abs(dy)){
                    let x = square.value[0] + dx
                    let y = square.value[1] + dy
                    if((x > 0 && x < 8) && (y > 0 && y < 8)){
                        for (let move of squares) {
                            
                            if(move.value[0] == x && move.value[1] == y) square.edgesList.push(move)
                        }
                        
                    }
                }
            }
        } 
        
    }
    
    return squares
    
}



function knightsMoves(square1, square2){
    let squares = generateChessBoard()
    
    let board = new Graph([...squares])
    let s1Node = new Node()
    let s2Node = new Node()
    for (let square of squares) {
        
        if(square.value[0] == square1[0] && square.value[1] == square1[1]){
            s1Node = square
        }else if(square.value[0] == square2[0] && square.value[1] == square2[1]){
            s2Node = square
        }
    }
    
    return board.shortestPath(s1Node, s2Node)
}

console.log(knightsMoves([0,0], [2,3]))