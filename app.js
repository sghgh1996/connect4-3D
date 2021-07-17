// var vs = `#version 300 es

// in vec3 inPosition;
// in vec3 inNormal;
// out vec3 fsNormal;

// uniform mat4 matrix; 

// void main() {
//   fsNormal = inNormal; 
//   gl_Position = matrix * vec4(inPosition, 1.0);
// }`;

// var fs = `#version 300 es

// precision mediump float;

// in vec3 fsNormal;
// out vec4 outColor;

// uniform vec3 mDiffColor; //material diffuse color 
// uniform vec3 lightDirection; // directional light direction vec
// uniform vec3 lightColor; //directional light color 

// void main() {
//   vec3 lightDirNormalized = normalize(lightDirection);
//   vec3 nNormal = normalize(fsNormal);
//   vec3 lambertColor = mDiffColor * lightColor * dot(-lightDirNormalized,nNormal);
//   outColor = vec4(clamp(lambertColor, 0.0, 1.0),1.0);
// }`;

// //3D cube vertex coordinates and indices

// var vertices = [          // Vertex #:
//    1.0, 1.0,-1.0,   //  0
//    1.0,-1.0,-1.0,  //  1
//   -1.0, 1.0,-1.0,  //  2
//    1.0, 1.0, 1.0,  //  3
//   -1.0, 1.0, 1.0,  //  4
//    1.0,-1.0, 1.0,  //  5
//    1.0, 1.0,-1.0,  //  6
//    1.0, 1.0, 1.0,  //  7
//    1.0,-1.0,-1.0,  //  8
//    1.0,-1.0,-1.0,  //  9
//    1.0,-1.0, 1.0,  // 10
//   -1.0,-1.0,-1.0,  // 11
//   -1.0,-1.0,-1.0,  // 12
//   -1.0,-1.0, 1.0,  // 13
//   -1.0, 1.0,-1.0,  // 14
//    1.0, 1.0, 1.0,  // 15
//    1.0, 1.0,-1.0,  // 16
//   -1.0, 1.0, 1.0,  // 17
//   -1.0,-1.0,-1.0,  // 18
//   -1.0,-1.0, 1.0,  // 19
//    1.0,-1.0, 1.0,  // 20
//   -1.0,-1.0, 1.0,  // 21
//   -1.0, 1.0, 1.0,  // 22
//   -1.0, 1.0,-1.0   // 23
// ];

// var indices = [   // Face #:
//     0,  1,  2,  //  0
//     1, 18,  2,    //  1
//     3,  4,  5,    //  2
//     4, 19,  5,    //  3
//     6,  7,  8,    //  4
//     7, 20,  8,    //  5
//     9, 10, 11,    //  6
//    10, 21, 11,    //  7
//    12, 13, 14,    //  8
//    13, 22, 14,    //  9
//    15, 16, 17,    // 10
//    16, 23, 17     // 11
// ];

// var normals = [         // Color #:
//    0.0, 0.0,-1.0,   //  0
//    0.0, 0.0,-1.0,  //  1
//    0.0, 0.0,-1.0,  //  2
//    0.0, 0.0, 1.0,  //  3
//    0.0, 0.0, 1.0,  //  4
//    0.0, 0.0, 1.0,  //  5
//    1.0, 0.0, 0.0,  //  6
//    1.0, 0.0, 0.0,  //  7
//    1.0, 0.0, 0.0,  //  8
//    0.0,-1.0, 0.0,  //  9
//    0.0,-1.0, 0.0,  // 10
//    0.0,-1.0, 0.0,  // 11
//   -1.0, 0.0, 0.0,  // 12
//   -1.0, 0.0, 0.0,  // 13
//   -1.0, 0.0, 0.0,  // 14
//    0.0, 1.0, 0.0,  // 15
//    0.0, 1.0, 0.0,  // 16
//    0.0, 1.0, 0.0,  // 17
//    0.0, 0.0,-1.0,  // 18
//    0.0, 0.0, 1.0,  // 19
//    1.0, 0.0, 0.0,  // 20
//    0.0,-1.0, 0.0,  // 21
//   -1.0, 0.0, 0.0,  // 22
//    0.0, 1.0, 0.0   // 23
// ];


// function main() {

//   var program = null;

//   var cubeWorldMatrix = new Array();    //One world matrix for each cube...

//   //define directional light
//   var dirLightAlpha = -utils.degToRad(60);
//   var dirLightBeta  = -utils.degToRad(120);

//   var directionalLight = [Math.cos(dirLightAlpha) * Math.cos(dirLightBeta),
//               Math.sin(dirLightAlpha),
//               Math.cos(dirLightAlpha) * Math.sin(dirLightBeta)
//               ];
//   var directionalLightColor = [0.1, 1.0, 1.0];

//   //Define material color
//   var cubeMaterialColor = [0.5, 0.5, 0.5];
//   var lastUpdateTime = (new Date).getTime();

//   var cubeRx = 0.0;
//   var cubeRy = 0.0;
//   var cubeRz = 0.0;

//   cubeWorldMatrix[0] = utils.MakeWorld( -3.0, 0.0, -1.5, 0.0, 0.0, 0.0, 0.5);
//   cubeWorldMatrix[1] = utils.MakeWorld( 3.0, 0.0, -1.5, 0.0, 0.0, 0.0, 0.5);
//   cubeWorldMatrix[2] = utils.MakeWorld( 0.0, 0.0, -3.0, 0.0, 0.0, 0.0, 0.5);

//   var canvas = document.getElementById("game-canvas");
//   var gl = canvas.getContext("webgl2");
//   if (!gl) {
//     document.write("GL context not opened");
//     return;
//   }

//   gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
//   gl.clearColor(0.85, 0.85, 0.85, 1.0);
//   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//   gl.enable(gl.DEPTH_TEST);

//   var vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, vs);
//   var fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, fs);
//   var program = utils.createProgram(gl, vertexShader, fragmentShader);
//   gl.useProgram(program);

//   var positionAttributeLocation = gl.getAttribLocation(program, "inPosition");  
//   var normalAttributeLocation = gl.getAttribLocation(program, "inNormal");  
//   var matrixLocation = gl.getUniformLocation(program, "matrix");
//   var materialDiffColorHandle = gl.getUniformLocation(program, 'mDiffColor');
//   var lightDirectionHandle = gl.getUniformLocation(program, 'lightDirection');
//   var lightColorHandle = gl.getUniformLocation(program, 'lightColor');
  
//   var perspectiveMatrix = utils.MakePerspective(90, gl.canvas.width/gl.canvas.height, 0.1, 100.0);
//   var viewMatrix = utils.MakeView(3.0, 3.0, 2.5, -45.0, -40.0);

//   var mesh = new OBJ.Mesh(baseObjStr);
//   OBJ.initMeshBuffers(gl, mesh);
    
//   var vao = gl.createVertexArray();
//   gl.bindVertexArray(vao);

//   var positionBuffer = gl.createBuffer();
//   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.vertices), gl.STATIC_DRAW);
//   gl.enableVertexAttribArray(positionAttributeLocation);
//   gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

//   var normalBuffer = gl.createBuffer();
//   gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.vertexNormals), gl.STATIC_DRAW);
//   gl.enableVertexAttribArray(normalAttributeLocation);
//   gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);

//   var indexBuffer = gl.createBuffer();
//   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
//   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh.indices), gl.STATIC_DRAW);

//   gl.bindVertexArray(vao);
//   gl.drawElements(gl.TRIANGLES, mesh.indices.length, gl.UNSIGNED_SHORT, 0 );

//   // drawScene();

//   function drawScene() {

//     gl.clearColor(1.0, 1.0, 1.0, 1.0);
//     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

//     for(i = 0; i < 3; i++){
//       var viewWorldMatrix = utils.multiplyMatrices(viewMatrix, cubeWorldMatrix[i]);
//       var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);
//       gl.uniformMatrix4fv(matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));

//       var lightDirMatrix = utils.transposeMatrix(cubeWorldMatrix[i]); 
//       var lightdirTransformed = utils.multiplyMatrix3Vector3(utils.sub3x3from4x4(lightDirMatrix), directionalLight); 

//       gl.uniform3fv(materialDiffColorHandle, cubeMaterialColor);
//       gl.uniform3fv(lightColorHandle,  directionalLightColor);
//       gl.uniform3fv(lightDirectionHandle,  lightdirTransformed);

//       gl.bindVertexArray(vao);
//       gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0 );
//     }
    
//     window.requestAnimationFrame(drawScene);
//   }

// }

// window.onload = main;


const vs = `#version 300 es
  in vec4 a_position;
  in vec3 a_normal;

  uniform mat4 u_projection;
  uniform mat4 u_view;
  uniform mat4 u_world;

  out vec3 v_normal;

  void main() {
    gl_Position = u_projection * u_view * u_world * a_position;
    v_normal = mat3(u_world) * a_normal;
  }
  `;

  const fs = `#version 300 es
  precision highp float;

  in vec3 v_normal;

  uniform vec4 u_diffuse;
  uniform vec3 u_lightDirection;

  out vec4 outColor;

  void main () {
    vec3 normal = normalize(v_normal);
    float fakeLight = dot(u_lightDirection, normal) * .5 + .5;
    outColor = vec4(u_diffuse.rgb * fakeLight, u_diffuse.a);
  }
`;



function parseOBJ(text) {
  // because indices are base 1 let's just fill in the 0th data
  const objPositions = [[0, 0, 0]];
  const objTexcoords = [[0, 0]];
  const objNormals = [[0, 0, 0]];

  // same order as `f` indices
  const objVertexData = [
    objPositions,
    objTexcoords,
    objNormals,
  ];

  // same order as `f` indices
  let webglVertexData = [
    [],   // positions
    [],   // texcoords
    [],   // normals
  ];

  const materialLibs = [];
  const geometries = [];
  let geometry;
  let groups = ['default'];
  let material = 'default';
  let object = 'default';

  const noop = () => {};

  function newGeometry() {
    // If there is an existing geometry and it's
    // not empty then start a new one.
    if (geometry && geometry.data.position.length) {
      geometry = undefined;
    }
  }

  function setGeometry() {
    if (!geometry) {
      const position = [];
      const texcoord = [];
      const normal = [];
      webglVertexData = [
        position,
        texcoord,
        normal,
      ];
      geometry = {
        object,
        groups,
        material,
        data: {
          position,
          texcoord,
          normal,
        },
      };
      geometries.push(geometry);
    }
  }

  function addVertex(vert) {
    const ptn = vert.split('/');
    ptn.forEach((objIndexStr, i) => {
      if (!objIndexStr) {
        return;
      }
      const objIndex = parseInt(objIndexStr);
      const index = objIndex + (objIndex >= 0 ? 0 : objVertexData[i].length);
      webglVertexData[i].push(...objVertexData[i][index]);
    });
  }

  const keywords = {
    v(parts) {
      objPositions.push(parts.map(parseFloat));
    },
    vn(parts) {
      objNormals.push(parts.map(parseFloat));
    },
    vt(parts) {
      // should check for missing v and extra w?
      objTexcoords.push(parts.map(parseFloat));
    },
    f(parts) {
      setGeometry();
      const numTriangles = parts.length - 2;
      for (let tri = 0; tri < numTriangles; ++tri) {
        addVertex(parts[0]);
        addVertex(parts[tri + 1]);
        addVertex(parts[tri + 2]);
      }
    },
    s: noop,    // smoothing group
    mtllib(parts, unparsedArgs) {
      // the spec says there can be multiple filenames here
      // but many exist with spaces in a single filename
      materialLibs.push(unparsedArgs);
    },
    usemtl(parts, unparsedArgs) {
      material = unparsedArgs;
      newGeometry();
    },
    g(parts) {
      groups = parts;
      newGeometry();
    },
    o(parts, unparsedArgs) {
      object = unparsedArgs;
      newGeometry();
    },
  };

  const keywordRE = /(\w*)(?: )*(.*)/;
  const lines = text.split('\n');
  for (let lineNo = 0; lineNo < lines.length; ++lineNo) {
    const line = lines[lineNo].trim();
    if (line === '' || line.startsWith('#')) {
      continue;
    }
    const m = keywordRE.exec(line);
    if (!m) {
      continue;
    }
    const [, keyword, unparsedArgs] = m;
    const parts = line.split(/\s+/).slice(1);
    const handler = keywords[keyword];
    if (!handler) {
      console.warn('unhandled keyword:', keyword);  // eslint-disable-line no-console
      continue;
    }
    handler(parts, unparsedArgs);
  }

  // remove any arrays that have no entries.
  for (const geometry of geometries) {
    geometry.data = Object.fromEntries(
        Object.entries(geometry.data).filter(([, array]) => array.length > 0));
  }

  return {
    geometries,
    materialLibs,
  };
}



function main() {
  var canvas = document.getElementById("game-canvas");
  const gl = canvas.getContext("webgl2");
  if (!gl) {
    return;
  }

  // Tell the twgl to match position with a_position etc..
  twgl.setAttributePrefix("a_");


  // compiles and links the shaders, looks up attribute and uniform locations
  const meshProgramInfo = twgl.createProgramInfo(gl, [vs, fs]);

  // const response = await fetch('https://webgl2fundamentals.org/webgl/resources/models/cube/cube.obj');  
  // const text = await response.text();
  const obj = parseOBJ(baseObjStr);

  const parts = obj.geometries.map(({data}) => {
    // Because data is just named arrays like this
    //
    // {
    //   position: [...],
    //   texcoord: [...],
    //   normal: [...],
    // }
    //
    // and because those names match the attributes in our vertex
    // shader we can pass it directly into `createBufferInfoFromArrays`
    // from the article "less code more fun".

    // create a buffer for each array by calling
    // gl.createBuffer, gl.bindBuffer, gl.bufferData
    const bufferInfo = twgl.createBufferInfoFromArrays(gl, data);
    const vao = twgl.createVAOFromBufferInfo(gl, meshProgramInfo, bufferInfo);
    return {
      material: {
        u_diffuse: [Math.random(), Math.random(), Math.random(), 1],
      },
      bufferInfo,
      vao,
    };
  });

  function getExtents(positions) {
    const min = positions.slice(0, 3);
    const max = positions.slice(0, 3);
    for (let i = 3; i < positions.length; i += 3) {
      for (let j = 0; j < 3; ++j) {
        const v = positions[i + j];
        min[j] = Math.min(v, min[j]);
        max[j] = Math.max(v, max[j]);
      }
    }
    return {min, max};
  }

  function getGeometriesExtents(geometries) {
    return geometries.reduce(({min, max}, {data}) => {
      const minMax = getExtents(data.position);
      return {
        min: min.map((min, ndx) => Math.min(minMax.min[ndx], min)),
        max: max.map((max, ndx) => Math.max(minMax.max[ndx], max)),
      };
    }, {
      min: Array(3).fill(Number.POSITIVE_INFINITY),
      max: Array(3).fill(Number.NEGATIVE_INFINITY),
    });
  }

  const extents = getGeometriesExtents(obj.geometries);
  const range = m4.subtractVectors(extents.max, extents.min);
  // amount to move the object so its center is at the origin
  const objOffset = m4.scaleVector(
      m4.addVectors(
        extents.min,
        m4.scaleVector(range, 0.5)),
      -1);
  const cameraTarget = [0, 0, 0];
  // figure out how far away to move the camera so we can likely
  // see the object.
  const radius = m4.length(range) * 1.2;
  const cameraPosition = m4.addVectors(cameraTarget, [
    0,
    0,
    radius,
  ]);
  // Set zNear and zFar to something hopefully appropriate
  // for the size of this object.
  const zNear = radius / 100;
  const zFar = radius * 3;

  function degToRad(deg) {
    return deg * Math.PI / 180;
  }

  function render(time) {
    time *= 0.001;  // convert to seconds

    twgl.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);

    const fieldOfViewRadians = degToRad(60);
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const projection = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);

    const up = [0, 1, 0];
    // Compute the camera's matrix using look at.
    const camera = m4.lookAt(cameraPosition, cameraTarget, up);

    // Make a view matrix from the camera matrix.
    const view = m4.inverse(camera);

    const sharedUniforms = {
      u_lightDirection: m4.normalize([-1, 3, 5]),
      u_view: view,
      u_projection: projection,
    };

    gl.useProgram(meshProgramInfo.program);

    // calls gl.uniform
    twgl.setUniforms(meshProgramInfo, sharedUniforms);

    // compute the world matrix once since all parts
    // are at the same space.
    // let u_world = m4.yRotation(time);
    let u_world = utils.identityMatrix()
    u_world = m4.translate(u_world, ...objOffset);

    for (const {bufferInfo, vao, material} of parts) {
      // set the attributes for this part.
      gl.bindVertexArray(vao);
      // calls gl.uniform
      twgl.setUniforms(meshProgramInfo, {
        u_world,
        u_diffuse: material.u_diffuse,
      });
      // calls gl.drawArrays or gl.drawElements
      twgl.drawBufferInfo(gl, bufferInfo);
    }

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

window.onload = main;
