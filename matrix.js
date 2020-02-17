function Matrix(rows, cols) {
  this.rows = rows;
  this.cols = cols;
  this.matrix = new Array(rows);
  for (var i = 0; i < this.rows; i++) {
    this.matrix[i] = new Array(cols);
    for (var j = 0; j < this.cols; j++) {
      this.matrix[i][j] = 0;
    }
  }
}

Matrix.prototype.randomize = function() {
  for (var i = 0; i < this.rows; i++) {
    for (var j = 0; j < this.cols; j++) {
      this.matrix[i][j] = randomGaussian();
    }
  }
}

Matrix.prototype.activate = function() {
	for (var i = 0; i < this.rows; i++) {
		for (var j = 0; j < this.cols; j++) {
			this.matrix[i][j] = 1/(1 + exp(-this.matrix[i][j]));
		}		
	}
}

Matrix.prototype.copy = function() {
	let clone = new Matrix(this.rows, this.cols);
	for (let i = 0; i < this.rows; i++) {
		for (let j = 0; j < this.cols; j++) {
			clone.matrix[i][j] = this.matrix[i][j];
		}
	}
	return clone;
}

Matrix.prototype.crossOver = function(partner) {
	let child = new Matrix(this.rows, this.cols);
	let randc = floor(random(this.cols));
	let randr = floor(random(this.rows));
	for (let i = 0; i < this.rows; i++) {
		for (let j = 0; j < this.cols; j++) {
			if ((i < randr) || (i == randr && j < randc)) {
				child.matrix[i][j] = this.matrix[i][j];
			} else {
				child.matrix[i][j] = partner.matrix[i][j];
			}
		}		
	}
	return child;
}

Matrix.prototype.toArray = function() {  
  var arr = [];
  for (var i = 0; i < this.rows; i++) {
    for (var j = 0; j < this.cols; j++) {
      arr.push(this.matrix[i][j]);
    }
  }
  return arr;
}

Matrix.prototype.transpose = function() {
  var result = new Matrix(this.cols, this.rows);
  for (var i = 0; i < result.rows; i++) {
    for (var j = 0; j < result.cols; j++) {
      result.matrix[i][j] = this.matrix[j][i];
    }
  }
  return result;
}

Matrix.prototype.copy = function() {
  var result = new Matrix(this.rows, this.cols);
  for (var i = 0; i < result.rows; i++) {
    for (var j = 0; j < result.cols; j++) {
      result.matrix[i][j] = this.matrix[i][j];
    }
  }
  return result;
}

Matrix.prototype.mutate = function(mutationRate) {
	for (let i = 0; i < this.rows; i++) {
		for (let j = 0; j < this.cols; j++) {
			if (random(1) < mutatioRate) {
				this.matrix[i][j] = randomGaussian();
			}
		}
	}
}

Matrix.prototype.add = function(other) {
  if (other instanceof Matrix) {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] += other.matrix[i][j];
      }
    }    
  } else {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] += other;
      }
    }
  }
}

Matrix.prototype.multiply = function(other) {
  if (other instanceof Matrix) {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] *= other.matrix[i][j];
      }
    }    
  } else {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] *= other;
      }
    }
  }
}

Matrix.map = function(m, fn) {
  var result = new Matrix(m.rows, m.cols);
  for (var i = 0; i < result.rows; i++) {
    for (var j = 0; j < result.cols; j++) {
      result.matrix[i][j] = fn(m.matrix[i][j]);
    }
  }
  return result;
}

Matrix.subtract = function(a, b) {
  var result = new Matrix(a.rows, a.cols);
  for (var i = 0; i < result.rows; i++) {
    for (var j = 0; j < result.cols; j++) {
      result.matrix[i][j] = a.matrix[i][j] - b.matrix[i][j];
    }
  }
  return result;
}

Matrix.dot = function(a, b) {
  if (a.cols != b.rows) {
    console.log("Incompatible matrix sizes!");
    return;
  }  
  var result = new Matrix(a.rows, b.cols);
  for (var i = 0; i < a.rows; i++) {
    for (var j = 0; j < b.cols; j++) {   
      var sum = 0;
      for (var k = 0; k < a.cols; k++) {
        sum += a.matrix[i][k] * b.matrix[k][j];
      }      
      result.matrix[i][j] = sum;
    }
  }
  return result;
}

Matrix.fromArray = function(array) {
  var m = new Matrix(array.length, 1);
  for (var i = 0; i < array.length; i++) {
    m.matrix[i][0] = array[i];
  }
  return m;
}

Matrix.prototype.visualize = function(idSelector) {
  let table;
  if (idSelector) {
    if (typeof idSelector !== 'string') {
      console.error('Invalid argument type (expected string, received ' + typeof idSelector + ')');
      return;
    }
    table = document.getElementById(idSelector);
    if (table === null) {
      table = document.createElement('table');
      table.id = idSelector;
      document.body.appendChild(table);
    }
    table.innerHTML = ''; // clear
    table.setAttribute('title', 'id: ' + idSelector);
  } else {    
    table = document.createElement('table');
    document.body.appendChild(table);
  }
  table.className = 'vis-matrix';
  table.style.margin = '40px';
  table.style.padding = '4px 10px';
  table.style.borderLeft = '2px solid black';
  table.style.borderRight = '2px solid black';
  table.style.borderRadius = '20px';
  this.matrix.forEach((el, iRow) => {
    let row = document.createElement('tr');
    el.forEach((el, iCol) => {
      let cell = document.createElement('td');
      cell.innerHTML = el;
      cell.setAttribute('title', '[' + iRow + ',' + iCol + ']');
      cell.style.padding = '3px 8px';
      cell.style.textAlign = 'center';
      cell.style.color = 'black';
      row.appendChild(cell);
    })
    table.appendChild(row);
  });
}

Matrix.prototype.pprint = function(){
  let fstring = '['; 
  for (let i=0;i<this.matrix.length;i++){
    fstring +=  (i!=0?' ':'') + ` [${this.matrix[i].map(x=>' ' + x.toString() + ' ')}],\n`;
  }
  console.log(fstring.substring(0,fstring.length-2) + ' ]');
}