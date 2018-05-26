var SerialPort = require('serialport');
var brain = require('brainjs')
var port = new SerialPort('COM4', {
  baudRate: 9600
});

var Datosguardados = new Array();
var Contador =0;
var Sensor1 = 0;
var Sensor1Tmp = 0;
var Estado = 0;
var Sensor2 = 0;
var Sensor2Tmp = 0;
const Neurona = new brain.NeuralNetwork();
var CantidadDatos = 300;
var Textosnumeros = '';
var Datos1 = [ 0.692, 0.652, 0.718, 0.682, 0.676, 0.706, 0.646, 0.692, 0.694, 0.652, 0.696, 0.650, 0.656, 0.704, 0.646, 0.694, 0.692, 0.646, 0.734, 0.766, 0.870, 0.970, 0.734, 0.494, 0.360, 0.334, 0.538, 0.630, 0.676, 0.726, 0.674, 0.716, 0.732, 0.708, 0.762, 0.720, 0.718, 0.750, 0.686, 0.712, 0.724, 0.686, 0.734, 0.704, 0.704, 0.742, 0.682, 0.722, 0.758, 0.690, 0.732, 0.688, 0.682, 0.744, 0.698, 0.722, 0.736, 0.688, 0.740, 0.708, 0.706, 0.738, 0.680, 0.706, 0.696, 0.620, 0.662, 0.632, 0.602, 0.628, 0.572, 0.612, 0.630, 0.566, 0.612, 0.584, 0.560, 0.612, 0.562, 0.608, 0.640, 0.582, 0.620, 0.598, 0.582, 0.628, 0.574, 0.596, 0.612, 0.564, 0.636, 0.614, 0.572, 0.616, 0.590, 0.614, 0.624, 0.562, 0.622, 0.606, 0.570, 0.630, 0.588, 0.612, 0.642, 0.588, 0.650, 0.642, 0.618, 0.690, 0.646, 0.648, 0.656, 0.594, 0.646, 0.636, 0.594, 0.640, 0.584, 0.600, 0.632, 0.570, 0.630, 0.630, 0.594, 0.662, 0.658, 0.768, 0.876, 0.618, 0.382, 0.270, 0.258, 0.450, 0.512, 0.578, 0.660, 0.600, 0.650, 0.646, 0.592, 0.680, 0.642, 0.630, 0.694, 0.642, 0.702, 0.706, 0.638, 0.710, 0.662, 0.648, 0.722, 0.654, 0.712, 0.734, 0.664, 0.740, 0.706, 0.694, 0.768, 0.696, 0.748, 0.784, 0.686, 0.758, 0.736, 0.710, 0.778, 0.682, 0.704, 0.728, 0.642, 0.704, 0.656, 0.606, 0.670, 0.576, 0.602, 0.660, 0.592, 0.662, 0.622, 0.578, 0.662, 0.586, 0.614, 0.664, 0.570, 0.642, 0.630, 0.588, 0.674, 0.598, 0.634, 0.686, 0.578, 0.654, 0.640, 0.580, 0.670, 0.606, 0.636, 0.694, 0.588, 0.662, 0.654, 0.604, 0.678, 0.604, 0.638, 0.700, 0.614, 0.682, 0.666, 0.634, 0.740, 0.670, 0.674, 0.716, 0.624, 0.686, 0.668, 0.618, 0.688, 0.622, 0.636, 0.682, 0.596, 0.670, 0.666, 0.618, 0.684, 0.650, 0.750, 0.898, 0.838, 0.662, 0.382, 0.246, 0.390, 0.470, 0.576, 0.670, 0.626, 0.692, 0.692, 0.660, 0.716, 0.662, 0.694, 0.742, 0.676, 0.726, 0.722, 0.684, 0.738, 0.690, 0.724, 0.758, 0.694, 0.746, 0.748, 0.710, 0.760, 0.716, 0.742, 0.786, 0.724, 0.782, 0.774, 0.738, 0.796, 0.756, 0.770, 0.798, 0.728, 0.768, 0.750, 0.696, 0.726, 0.666, 0.672, 0.694, 0.618, 0.668, 0.660, 0.614, 0.668, 0.618, 0.630, 0.660, 0.604, 0.656, 0.648, 0.608, 0.660, 0.616, 0.626, 0.670, 0.610];

var Datos2 =[  0.892, 0.862, 0.706, 0.344, 0.194, 0.324, 0.440, 0.600, 0.658, 0.614, 0.688, 0.664, 0.656, 0.700, 0.644, 0.700, 0.720, 0.650, 0.714, 0.694, 0.682, 0.718, 0.664, 0.710, 0.740, 0.686, 0.740, 0.714, 0.698, 0.766, 0.710, 0.744, 0.776, 0.708, 0.770, 0.768, 0.746, 0.798, 0.734, 0.762, 0.790, 0.698, 0.742, 0.702, 0.650, 0.718, 0.628, 0.630, 0.672, 0.578, 0.636, 0.622, 0.570, 0.656, 0.598, 0.598, 0.648, 0.562, 0.630, 0.634, 0.580, 0.662, 0.598, 0.592, 0.660, 0.584, 0.644, 0.642, 0.592, 0.664, 0.610, 0.624, 0.680, 0.588, 0.646, 0.652, 0.608, 0.662, 0.614, 0.630, 0.668, 0.602, 0.670, 0.658, 0.624, 0.688, 0.648, 0.670, 0.698, 0.628, 0.672, 0.650, 0.622, 0.666, 0.616, 0.640, 0.660, 0.606, 0.666, 0.652, 0.620, 0.696, 0.740, 0.878, 0.924, 0.684, 0.438, 0.282, 0.324, 0.516, 0.576, 0.662, 0.672, 0.644, 0.702, 0.674, 0.670, 0.708, 0.678, 0.708, 0.710, 0.684, 0.732, 0.702, 0.708, 0.722, 0.680, 0.744, 0.748, 0.710, 0.754, 0.718, 0.722, 0.752, 0.718, 0.778, 0.770, 0.742, 0.800, 0.766, 0.750, 0.790, 0.746, 0.772, 0.766, 0.700, 0.730, 0.702, 0.658, 0.686, 0.630, 0.630, 0.650, 0.584, 0.632, 0.630, 0.586, 0.640, 0.606, 0.610, 0.642, 0.580, 0.626, 0.634, 0.592, 0.648, 0.612, 0.612, 0.654, 0.592, 0.640, 0.642, 0.584, 0.638, 0.618, 0.620, 0.654, 0.586, 0.630, 0.646, 0.588, 0.638, 0.610, 0.618, 0.654, 0.582, 0.628, 0.644, 0.598, 0.654, 0.616, 0.612, 0.672, 0.618, 0.664, 0.680, 0.630, 0.684, 0.640, 0.622, 0.664, 0.606, 0.640, 0.654, 0.590, 0.658, 0.632, 0.604, 0.648, 0.614, 0.738, 0.856, 0.850, 0.766, 0.466, 0.276, 0.336, 0.418, 0.576, 0.668, 0.614, 0.678, 0.662, 0.640, 0.692, 0.644, 0.682, 0.706, 0.640, 0.698, 0.694, 0.676, 0.728, 0.670, 0.692, 0.728, 0.666, 0.714, 0.700, 0.678, 0.740, 0.702, 0.730, 0.764, 0.720, 0.776, 0.760, 0.728, 0.776, 0.726, 0.744, 0.776, 0.714, 0.750, 0.730, 0.676, 0.718, 0.670, 0.674, 0.690, 0.616, 0.652, 0.632, 0.608, 0.658, 0.604, 0.624, 0.662, 0.596, 0.634, 0.640, 0.614, 0.658, 0.608, 0.628, 0.660, 0.598, 0.648, 0.646, 0.622, 0.664, 0.628, 0.642, 0.664, 0.608, 0.658, 0.646, 0.608, 0.674, 0.636, 0.638, 0.676, 0.612, 0.648, 0.652, 0.622, 0.676, 0.632, 0.636, 0.664, 0.618];

var Datos3 =[  0.692, 0.652, 0.718, 0.682, 0.676, 0.706, 0.646, 0.692, 0.694, 0.652, 0.696, 0.650, 0.656, 0.704, 0.646, 0.694, 0.692, 0.646, 0.734, 0.766, 0.870, 0.970, 0.734, 0.494, 0.360, 0.334, 0.538, 0.630, 0.676, 0.726, 0.674, 0.716, 0.732, 0.708, 0.762, 0.720, 0.718, 0.750, 0.686, 0.712, 0.724, 0.686, 0.734, 0.704, 0.704, 0.742, 0.682, 0.722, 0.758, 0.690, 0.732, 0.688, 0.682, 0.744, 0.698, 0.722, 0.736, 0.688, 0.740, 0.708, 0.706, 0.738, 0.680, 0.706, 0.696, 0.620, 0.662, 0.632, 0.602, 0.628, 0.572, 0.612, 0.630, 0.566, 0.612, 0.584, 0.560, 0.612, 0.562, 0.608, 0.640, 0.582, 0.620, 0.598, 0.582, 0.628, 0.574, 0.596, 0.612, 0.564, 0.636, 0.614, 0.572, 0.616, 0.590, 0.614, 0.624, 0.562, 0.622, 0.606, 0.570, 0.630, 0.588, 0.612, 0.642, 0.588, 0.650, 0.642, 0.618, 0.690, 0.646, 0.648, 0.656, 0.594, 0.646, 0.636, 0.594, 0.640, 0.584, 0.600, 0.632, 0.570, 0.630, 0.630, 0.594, 0.662, 0.658, 0.768, 0.876, 0.618, 0.382, 0.270, 0.258, 0.450, 0.512, 0.578, 0.660, 0.600, 0.650, 0.646, 0.592, 0.680, 0.642, 0.630, 0.694, 0.642, 0.702, 0.706, 0.638, 0.710, 0.662, 0.648, 0.722, 0.654, 0.712, 0.734, 0.664, 0.740, 0.706, 0.694, 0.768, 0.696, 0.748, 0.784, 0.686, 0.758, 0.736, 0.710, 0.778, 0.682, 0.704, 0.728, 0.642, 0.704, 0.656, 0.606, 0.670, 0.576, 0.602, 0.660, 0.592, 0.662, 0.622, 0.578, 0.662, 0.586, 0.614, 0.664, 0.570, 0.642, 0.630, 0.588, 0.674, 0.598, 0.634, 0.686, 0.578, 0.654, 0.640, 0.580, 0.670, 0.606, 0.636, 0.694, 0.588, 0.662, 0.654, 0.604, 0.678, 0.604, 0.638, 0.700, 0.614, 0.682, 0.666, 0.634, 0.740, 0.670, 0.674, 0.716, 0.624, 0.686, 0.668, 0.618, 0.688, 0.622, 0.636, 0.682, 0.596, 0.670, 0.666, 0.618, 0.684, 0.650, 0.750, 0.898, 0.838, 0.662, 0.382, 0.246, 0.390, 0.470, 0.576, 0.670, 0.626, 0.692, 0.692, 0.660, 0.716, 0.662, 0.694, 0.742, 0.676, 0.726, 0.722, 0.684, 0.738, 0.690, 0.724, 0.758, 0.694, 0.746, 0.748, 0.710, 0.760, 0.716, 0.742, 0.786, 0.724, 0.782, 0.774, 0.738, 0.796, 0.756, 0.770, 0.798, 0.728, 0.768, 0.750, 0.696, 0.726, 0.666, 0.672, 0.694, 0.618, 0.668, 0.660, 0.614, 0.668, 0.618, 0.630, 0.660, 0.604, 0.656, 0.648, 0.608, 0.660, 0.616, 0.626, 0.670, 0.610];

var Datos4 =[0.708, 0.752, 0.766, 0.710, 0.778, 0.730, 0.738, 0.808, 0.734, 0.768, 0.790, 0.736, 0.798, 0.750, 0.728, 0.770, 0.676, 0.690, 0.692, 0.632, 0.700, 0.652, 0.628, 0.680, 0.610, 0.654, 0.672, 0.602, 0.666, 0.626, 0.604, 0.678, 0.616, 0.644, 0.660, 0.602, 0.668, 0.628, 0.610, 0.682, 0.604, 0.632, 0.656, 0.594, 0.660, 0.630, 0.606, 0.674, 0.612, 0.642, 0.666, 0.602, 0.666, 0.632, 0.606, 0.672, 0.606, 0.638, 0.668, 0.602, 0.662, 0.628, 0.606, 0.676, 0.606, 0.628, 0.668, 0.612, 0.678, 0.652, 0.622, 0.704, 0.664, 0.684, 0.696, 0.614, 0.670, 0.654, 0.612, 0.670, 0.602, 0.618, 0.652, 0.590, 0.652, 0.634, 0.590, 0.662, 0.636, 0.728, 0.856, 0.792, 0.624, 0.362, 0.240, 0.372, 0.444, 0.560, 0.658, 0.610, 0.668, 0.656, 0.620, 0.694, 0.644, 0.648, 0.694, 0.632, 0.684, 0.674, 0.636, 0.710, 0.656, 0.670, 0.718, 0.652, 0.706, 0.704, 0.668, 0.728, 0.672, 0.690, 0.746, 0.686, 0.740, 0.738, 0.698, 0.770, 0.726, 0.734, 0.778, 0.710, 0.758, 0.742, 0.676, 0.726, 0.666, 0.654, 0.686, 0.604, 0.652, 0.650, 0.588, 0.650, 0.594, 0.590, 0.652, 0.572, 0.626, 0.632, 0.556, 0.634, 0.560, 0.516, 0.612, 0.502, 0.538, 0.584, 0.486, 0.580, 0.536, 0.502, 0.604, 0.504, 0.540, 0.588, 0.490, 0.584, 0.548, 0.502, 0.608, 0.506, 0.544, 0.602, 0.496, 0.588, 0.562, 0.520, 0.630, 0.522, 0.562, 0.622, 0.520, 0.616, 0.596, 0.544, 0.654, 0.578, 0.622, 0.688, 0.560, 0.632, 0.604, 0.544, 0.650, 0.560, 0.584, 0.642, 0.528, 0.616, 0.606, 0.550, 0.654, 0.568, 0.618, 0.742, 0.728, 0.872, 0.686, 0.340, 0.318, 0.260, 0.412, 0.612, 0.566, 0.662, 0.654, 0.590, 0.700, 0.630, 0.648, 0.726, 0.614, 0.692, 0.688, 0.622, 0.728, 0.662, 0.682, 0.500, 0.644, 0.720, 0.722, 0.650, 0.752, 0.674, 0.684, 0.500, 0.684, 0.758, 0.766, 0.694, 0.798, 0.718, 0.718, 0.500, 0.710, 0.774, 0.780, 0.688, 0.772, 0.686, 0.666, 0.500, 0.626, 0.686, 0.690, 0.598, 0.692, 0.618, 0.608, 0.704, 0.602, 0.676, 0.708, 0.654, 0.738, 0.690, 0.698, 0.500, 0.688, 0.738, 0.736, 0.678, 0.768, 0.720, 0.712, 0.500, 0.700, 0.750, 0.752, 0.698, 0.768, 0.718, 0.718, 0.766, 0.700, 0.754, 0.758, 0.708, 0.774, 0.714, 0.704, 0.500, 0.706, 0.748, 0.752, 0.688, 0.754, 0.706, 0.702];

var Datos5 =[ 0.624, 0.664, 0.558, 0.654, 0.618, 0.584, 0.688, 0.590, 0.634, 0.672, 0.570, 0.662, 0.628, 0.584, 0.682, 0.582, 0.632, 0.694, 0.600, 0.674, 0.626, 0.580, 0.684, 0.582, 0.620, 0.698, 0.604, 0.680, 0.664, 0.636, 0.738, 0.634, 0.642, 0.692, 0.602, 0.678, 0.644, 0.580, 0.670, 0.574, 0.610, 0.684, 0.580, 0.650, 0.626, 0.584, 0.724, 0.708, 0.808, 0.890, 0.556, 0.372, 0.284, 0.284, 0.534, 0.552, 0.618, 0.702, 0.600, 0.678, 0.666, 0.604, 0.716, 0.652, 0.670, 0.500, 0.632, 0.702, 0.698, 0.638, 0.738, 0.656, 0.670, 0.500, 0.656, 0.732, 0.726, 0.652, 0.754, 0.686, 0.700, 0.500, 0.678, 0.752, 0.752, 0.686, 0.792, 0.718, 0.722, 0.500, 0.670, 0.728, 0.718, 0.628, 0.720, 0.624, 0.616, 0.500, 0.580, 0.646, 0.654, 0.574, 0.664, 0.594, 0.590, 0.678, 0.566, 0.642, 0.656, 0.568, 0.666, 0.606, 0.602, 0.500, 0.582, 0.644, 0.662, 0.572, 0.680, 0.624, 0.610, 0.500, 0.598, 0.646, 0.670, 0.584, 0.682, 0.618, 0.602, 0.500, 0.602, 0.652, 0.670, 0.582, 0.680, 0.628, 0.610, 0.718, 0.622, 0.500, 0.718, 0.648, 0.736, 0.678, 0.656, 0.742, 0.662, 0.700, 0.726, 0.660, 0.734, 0.686, 0.664, 0.744, 0.672, 0.718, 0.746, 0.704, 0.826, 0.868, 0.928, 0.888, 0.530, 0.404, 0.422, 0.474, 0.656, 0.684, 0.708, 0.780, 0.714, 0.752, 0.776, 0.718, 0.780, 0.736, 0.722, 0.790, 0.722, 0.746, 0.768, 0.716, 0.782, 0.736, 0.708, 0.780, 0.660, 0.678, 0.732, 0.624, 0.706, 0.680, 0.622, 0.732, 0.648, 0.674, 0.742, 0.638, 0.726, 0.710, 0.644, 0.740, 0.636, 0.642, 0.696, 0.570, 0.634, 0.608, 0.544, 0.644, 0.542, 0.556, 0.626, 0.524, 0.598, 0.584, 0.512, 0.618, 0.538, 0.560, 0.500, 0.530, 0.602, 0.596, 0.526, 0.634, 0.558, 0.570, 0.500, 0.536, 0.604, 0.606, 0.540, 0.646, 0.570, 0.574, 0.500, 0.548, 0.620, 0.620, 0.544, 0.648, 0.572, 0.576, 0.500, 0.560, 0.622, 0.624, 0.550, 0.658, 0.622, 0.642, 0.726, 0.652, 0.730, 0.734, 0.672, 0.746, 0.686, 0.686, 0.740, 0.656, 0.704, 0.702, 0.646, 0.720, 0.662, 0.676, 0.500, 0.672, 0.742, 0.816, 0.854, 0.926, 0.630, 0.390, 0.382, 0.374, 0.562, 0.660, 0.650, 0.738, 0.698, 0.702, 0.754, 0.678, 0.728, 0.734, 0.682, 0.752, 0.702, 0.702, 0.760, 0.684, 0.738, 0.746, 0.694, 0.760, 0.706, 0.706, 0.780];

var Datos6= [ 0.672, 0.668, 0.662, 0.662, 0.658, 0.658, 0.660, 0.658, 0.658, 0.666, 0.678, 0.714, 0.802, 0.882, 0.832, 0.556, 0.282, 0.246, 0.380, 0.542, 0.632, 0.670, 0.686, 0.692, 0.698, 0.706, 0.712, 0.714, 0.722, 0.726, 0.722, 0.724, 0.724, 0.730, 0.734, 0.736, 0.740, 0.740, 0.746, 0.752, 0.756, 0.764, 0.762, 0.768, 0.776, 0.782, 0.786, 0.792, 0.796, 0.804, 0.808, 0.806, 0.802, 0.788, 0.776, 0.756, 0.734, 0.720, 0.704, 0.692, 0.678, 0.674, 0.666, 0.662, 0.662, 0.664, 0.666, 0.662, 0.658, 0.658, 0.660, 0.658, 0.656, 0.658, 0.656, 0.658, 0.660, 0.664, 0.666, 0.658, 0.660, 0.662, 0.664, 0.664, 0.666, 0.664, 0.672, 0.670, 0.668, 0.666, 0.662, 0.662, 0.668, 0.668, 0.670, 0.672, 0.676, 0.678, 0.682, 0.680, 0.686, 0.696, 0.706, 0.712, 0.724, 0.742, 0.732, 0.718, 0.716, 0.718, 0.720, 0.720, 0.716, 0.718, 0.716, 0.722, 0.732, 0.742, 0.742, 0.752, 0.782, 0.854, 0.960, 1.010, 0.814, 0.490, 0.366, 0.450, 0.608, 0.734, 0.808, 0.842, 0.856, 0.868, 0.884, 0.890, 0.894, 0.906, 0.914, 0.924, 0.940, 0.948, 0.954, 0.964, 0.976, 0.990, 1.002, 1.006, 1.018, 1.026, 1.036, 1.054, 1.066, 1.078, 1.096, 1.110, 1.122, 1.136, 1.154, 1.164, 1.168, 1.168, 1.170, 1.164, 1.160, 1.144, 1.126, 1.124, 1.114, 1.108, 1.108, 1.106, 1.112, 1.116, 1.118, 1.126, 1.134, 1.140, 1.142, 1.142, 1.152, 1.164, 1.166, 1.170, 1.178, 1.182, 1.186, 1.194, 1.198, 1.200, 1.208, 1.216, 1.220, 1.224, 1.228, 1.232, 1.234, 1.236, 1.236, 1.238, 1.242, 1.244, 1.244, 1.246, 1.250, 1.250, 1.246, 1.246, 1.248, 1.248, 1.252, 1.254, 1.260, 1.262, 1.264, 1.262, 1.252, 1.242, 1.228, 1.214, 1.202, 1.190, 1.176, 1.174, 1.164, 1.152, 1.144, 1.134, 1.126, 1.136, 1.190, 1.262, 1.264, 1.142, 0.800, 0.604, 0.654, 0.812, 0.922, 0.970, 0.970, 0.966, 0.958, 0.946, 0.936, 0.920, 0.902, 0.886, 0.872, 0.854, 0.838, 0.824, 0.812, 0.800, 0.784, 0.770, 0.754, 0.744, 0.736, 0.720, 0.706, 0.700, 0.688, 0.684, 0.680, 0.668, 0.662, 0.654, 0.650, 0.638, 0.624, 0.608, 0.584, 0.560, 0.534, 0.496, 0.462, 0.438, 0.416, 0.398, 0.384, 0.370, 0.356, 0.348, 0.342, 0.334, 0.326, 0.316, 0.306, 0.296, 0.290, 0.282, 0.276, 0.274, 0.270, 0.270, 0.258, 0.252, 0.254, 0.254, 0.248];

var Datos7=[ 0.204, 0.218, 0.222, 0.214, 0.214, 0.216, 0.222, 0.224, 0.224, 0.236, 0.236, 0.240, 0.252, 0.258, 0.262, 0.260, 0.264, 0.266, 0.266, 26.204, 0.204, 0.204, 0.218, 0.222, 0.214, 0.214, 0.216, 0.222, 0.224, 0.224, 0.236, 0.236, 0.240, 0.252, 0.258, 0.262, 0.260, 0.264, 0.266, 0.266, 4540.720, 0.728, 0.726, 0.726, 0.726, 0.730, 0.736, 0.736, 0.740, 0.744, 0.742, 0.746, 0.752, 0.758, 0.764, 0.770, 0.776, 0.780, 0.786, 0.786, 0.794, 0.804, 0.806, 0.804, 0.802, 0.794, 0.784, 0.776, 0.760, 0.744, 0.728, 0.716, 0.706, 0.700, 0.690, 0.678, 0.674, 0.674, 0.674, 0.674, 0.672, 0.670, 0.668, 0.674, 0.676, 0.674, 0.674, 0.674, 0.676, 0.674, 0.672, 0.670, 0.670, 0.672, 0.672, 0.678, 0.680, 0.676, 0.672, 0.674, 0.680, 0.682, 0.684, 0.682, 0.678, 0.680, 0.684, 0.680, 0.680, 0.680, 0.680, 0.688, 0.690, 0.694, 0.702, 0.708, 0.710, 0.712, 0.710, 0.702, 0.688, 0.686, 0.684, 0.682, 0.678, 0.674, 0.676, 0.676, 0.674, 0.678, 0.682, 0.704, 0.774, 0.864, 0.874, 0.656, 0.340, 0.232, 0.332, 0.502, 0.618, 0.670, 0.690, 0.700, 0.702, 0.710, 0.716, 0.712, 0.718, 0.720, 0.720, 0.724, 0.726, 0.734, 0.732, 0.732, 0.734, 0.738, 0.742, 0.744, 0.748, 0.756, 0.758, 0.766, 0.770, 0.776, 0.784, 0.792, 0.798, 0.804, 0.808, 0.806, 0.800, 0.792, 0.786, 0.774, 0.748, 0.726, 0.708, 0.696, 0.686, 0.672, 0.666, 0.666, 0.664, 0.662, 0.660, 0.658, 0.656, 0.652, 0.654, 0.660, 0.656, 0.650, 0.650, 0.650, 0.650, 0.648, 0.646, 0.646, 0.650, 0.652, 0.652, 0.654, 0.654, 0.654, 0.658, 0.660, 0.654, 0.654, 0.652, 0.650, 0.656, 0.662, 0.668, 0.672, 0.674, 0.680, 0.682, 0.678, 0.678, 0.668, 0.656, 0.650, 0.648, 0.642, 0.640, 0.638, 0.638, 0.640, 0.642, 0.642, 0.648, 0.670, 0.730, 0.808, 0.836, 0.642, 0.330, 0.206, 0.282, 0.444, 0.570, 0.630, 0.648, 0.658, 0.660, 0.660, 0.662, 0.670, 0.676, 0.678, 0.678, 0.682, 0.686, 0.688, 0.692, 0.696, 0.698, 0.698, 0.704, 0.708, 0.710, 0.716, 0.720, 0.724, 0.734, 0.740, 0.742, 0.744, 0.750, 0.758, 0.758, 0.760, 0.760, 0.758, 0.748, 0.732, 0.718, 0.700, 0.680, 0.670, 0.664, 0.656, 0.648, 0.640, 0.640, 0.642, 0.640, 0.636, 0.636, 0.636, 0.630, 0.636, 0.636, 0.638, 0.638, 0.634, 0.636, 0.640, 0.642];

var Datos8=[ 0.328, 0.462, 0.556, 0.672, 0.608, 0.660, 0.672, 0.620, 0.706, 0.666, 0.658, 0.720, 0.646, 0.694, 0.712, 0.656, 0.732, 0.690, 0.674, 0.740, 0.670, 0.716, 0.742, 0.684, 0.768, 0.736, 0.726, 0.802, 0.734, 0.778, 0.808, 0.744, 0.824, 0.786, 0.750, 0.802, 0.708, 0.720, 0.732, 0.642, 0.692, 0.648, 0.606, 0.672, 0.598, 0.626, 0.660, 0.582, 0.656, 0.626, 0.592, 0.666, 0.596, 0.620, 0.650, 0.574, 0.648, 0.626, 0.594, 0.664, 0.592, 0.616, 0.658, 0.578, 0.644, 0.622, 0.588, 0.664, 0.600, 0.620, 0.656, 0.576, 0.644, 0.628, 0.586, 0.672, 0.606, 0.622, 0.672, 0.610, 0.686, 0.672, 0.630, 0.696, 0.616, 0.624, 0.670, 0.594, 0.648, 0.632, 0.586, 0.656, 0.590, 0.604, 0.658, 0.584, 0.644, 0.648, 0.682, 0.906, 0.954, 0.830, 0.470, 0.098, 0.194, 0.398, 0.496, 0.638, 0.610, 0.626, 0.692, 0.622, 0.686, 0.690, 0.634, 0.712, 0.662, 0.668, 0.728, 0.654, 0.710, 0.714, 0.664, 0.744, 0.694, 0.698, 0.768, 0.696, 0.752, 0.764, 0.716, 0.808, 0.774, 0.772, 0.840, 0.764, 0.818, 0.826, 0.760, 0.816, 0.748, 0.710, 0.740, 0.642, 0.670, 0.666, 0.594, 0.670, 0.620, 0.602, 0.656, 0.580, 0.632, 0.644, 0.576, 0.650, 0.612, 0.596, 0.658, 0.584, 0.628, 0.648, 0.572, 0.646, 0.604, 0.586, 0.660, 0.586, 0.624, 0.644, 0.574, 0.646, 0.610, 0.588, 0.664, 0.588, 0.618, 0.640, 0.576, 0.654, 0.620, 0.598, 0.678, 0.618, 0.660, 0.694, 0.612, 0.668, 0.622, 0.598, 0.674, 0.590, 0.608, 0.636, 0.566, 0.640, 0.616, 0.584, 0.658, 0.580, 0.604, 0.702, 0.752, 0.938, 0.918, 0.594, 0.280, 0.112, 0.314, 0.554, 0.564, 0.654, 0.638, 0.608, 0.692, 0.628, 0.652, 0.692, 0.622, 0.696, 0.674, 0.638, 0.722, 0.662, 0.680, 0.718, 0.646, 0.722, 0.710, 0.672, 0.754, 0.698, 0.720, 0.770, 0.706, 0.788, 0.788, 0.748, 0.826, 0.766, 0.778, 0.826, 0.734, 0.778, 0.742, 0.662, 0.722, 0.646, 0.640, 0.674, 0.582, 0.640, 0.634, 0.580, 0.656, 0.598, 0.604, 0.652, 0.572, 0.630, 0.632, 0.580, 0.652, 0.596, 0.598, 0.656, 0.580, 0.636, 0.632, 0.574, 0.656, 0.602, 0.596, 0.656, 0.574, 0.628, 0.634, 0.580, 0.658, 0.606, 0.598, 0.658, 0.584, 0.630, 0.640, 0.584, 0.666, 0.620, 0.614, 0.688, 0.622, 0.684, 0.694, 0.616, 0.676, 0.628, 0.614, 0.678, 0.594, 0.630, 0.644];

var Datos9=[ 0.586, 0.634, 0.606, 0.598, 0.636, 0.574, 0.600, 0.608, 0.566, 0.614, 0.582, 0.568, 0.614, 0.560, 0.580, 0.598, 0.546, 0.590, 0.562, 0.548, 0.596, 0.548, 0.570, 0.588, 0.552, 0.606, 0.586, 0.564, 0.608, 0.564, 0.576, 0.580, 0.520, 0.566, 0.542, 0.516, 0.562, 0.520, 0.530, 0.552, 0.514, 0.580, 0.614, 0.674, 0.780, 0.612, 0.310, 0.112, 0.096, 0.300, 0.430, 0.482, 0.562, 0.530, 0.556, 0.586, 0.542, 0.586, 0.576, 0.560, 0.608, 0.568, 0.582, 0.612, 0.568, 0.614, 0.604, 0.582, 0.630, 0.592, 0.610, 0.646, 0.606, 0.654, 0.650, 0.626, 0.678, 0.646, 0.664, 0.694, 0.648, 0.682, 0.672, 0.636, 0.670, 0.616, 0.608, 0.618, 0.554, 0.576, 0.564, 0.530, 0.570, 0.532, 0.534, 0.558, 0.518, 0.552, 0.548, 0.522, 0.566, 0.536, 0.540, 0.566, 0.526, 0.562, 0.562, 0.530, 0.572, 0.548, 0.552, 0.586, 0.540, 0.568, 0.572, 0.542, 0.588, 0.556, 0.558, 0.596, 0.556, 0.590, 0.594, 0.566, 0.624, 0.602, 0.606, 0.644, 0.602, 0.632, 0.628, 0.590, 0.638, 0.606, 0.602, 0.636, 0.590, 0.622, 0.634, 0.606, 0.658, 0.650, 0.710, 0.838, 0.828, 0.714, 0.412, 0.184, 0.276, 0.422, 0.556, 0.666, 0.640, 0.686, 0.698, 0.660, 0.724, 0.690, 0.696, 0.740, 0.684, 0.734, 0.742, 0.702, 0.770, 0.732, 0.728, 0.784, 0.728, 0.776, 0.782, 0.748, 0.830, 0.794, 0.786, 0.850, 0.794, 0.840, 0.856, 0.804, 0.866, 0.828, 0.810, 0.856, 0.774, 0.788, 0.786, 0.712, 0.762, 0.714, 0.686, 0.738, 0.666, 0.700, 0.710, 0.650, 0.712, 0.676, 0.662, 0.716, 0.652, 0.688, 0.698, 0.632, 0.694, 0.658, 0.636, 0.694, 0.626, 0.658, 0.678, 0.614, 0.682, 0.652, 0.630, 0.688, 0.622, 0.654, 0.676, 0.614, 0.688, 0.662, 0.630, 0.688, 0.628, 0.654, 0.680, 0.620, 0.684, 0.666, 0.640, 0.696, 0.634, 0.654, 0.686, 0.622, 0.670, 0.648, 0.618, 0.674, 0.616, 0.632, 0.658, 0.596, 0.656, 0.644, 0.614, 0.710, 0.750, 0.842, 0.826, 0.500, 0.278, 0.224, 0.310, 0.530, 0.572, 0.622, 0.680, 0.632, 0.680, 0.674, 0.642, 0.702, 0.658, 0.668, 0.710, 0.652, 0.698, 0.696, 0.660, 0.712, 0.664, 0.666, 0.714, 0.660, 0.706, 0.708, 0.670, 0.740, 0.708, 0.708, 0.768, 0.718, 0.754, 0.760, 0.712, 0.776, 0.728, 0.718, 0.748, 0.666, 0.692, 0.670, 0.606, 0.670, 0.620, 0.608, 0.656, 0.584, 0.624];

var Datos10=[ 0.798, 0.718, 0.760, 0.792, 0.714, 0.792, 0.750, 0.714, 0.772, 0.672, 0.690, 0.702, 0.610, 0.672, 0.620, 0.584, 0.660, 0.574, 0.608, 0.638, 0.558, 0.642, 0.604, 0.566, 0.648, 0.566, 0.604, 0.636, 0.548, 0.640, 0.604, 0.572, 0.656, 0.568, 0.606, 0.644, 0.558, 0.642, 0.604, 0.566, 0.660, 0.564, 0.608, 0.644, 0.546, 0.646, 0.606, 0.566, 0.662, 0.564, 0.600, 0.652, 0.560, 0.654, 0.626, 0.592, 0.702, 0.612, 0.634, 0.674, 0.566, 0.654, 0.622, 0.564, 0.654, 0.562, 0.594, 0.648, 0.548, 0.634, 0.610, 0.558, 0.692, 0.696, 0.830, 0.914, 0.590, 0.292, 0.126, 0.178, 0.498, 0.534, 0.586, 0.664, 0.574, 0.664, 0.654, 0.596, 0.702, 0.618, 0.632, 0.700, 0.602, 0.690, 0.682, 0.612, 0.722, 0.648, 0.654, 0.728, 0.630, 0.712, 0.716, 0.650, 0.760, 0.688, 0.698, 0.786, 0.690, 0.760, 0.766, 0.692, 0.792, 0.724, 0.708, 0.770, 0.648, 0.704, 0.694, 0.598, 0.682, 0.612, 0.592, 0.670, 0.572, 0.622, 0.640, 0.562, 0.654, 0.604, 0.580, 0.660, 0.570, 0.614, 0.642, 0.564, 0.646, 0.610, 0.586, 0.668, 0.586, 0.620, 0.646, 0.564, 0.646, 0.616, 0.586, 0.664, 0.582, 0.612, 0.646, 0.566, 0.644, 0.620, 0.580, 0.656, 0.582, 0.606, 0.650, 0.578, 0.652, 0.636, 0.600, 0.690, 0.632, 0.656, 0.692, 0.596, 0.658, 0.642, 0.592, 0.660, 0.588, 0.600, 0.648, 0.568, 0.634, 0.628, 0.576, 0.656, 0.612, 0.686, 0.840, 0.834, 0.748, 0.390, 0.114, 0.236, 0.374, 0.530, 0.652, 0.594, 0.662, 0.668, 0.614, 0.698, 0.648, 0.658, 0.712, 0.632, 0.692, 0.700, 0.638, 0.720, 0.678, 0.680, 0.736, 0.664, 0.718, 0.726, 0.672, 0.754, 0.716, 0.710, 0.780, 0.708, 0.766, 0.778, 0.718, 0.798, 0.754, 0.732, 0.786, 0.702, 0.730, 0.728, 0.650, 0.718, 0.658, 0.630, 0.690, 0.608, 0.644, 0.662, 0.590, 0.666, 0.630, 0.600, 0.670, 0.598, 0.632, 0.664, 0.594, 0.662, 0.626, 0.602, 0.678, 0.604, 0.640, 0.666, 0.596, 0.660, 0.626, 0.600, 0.672, 0.602, 0.634, 0.666, 0.592, 0.658, 0.634, 0.598, 0.674, 0.604, 0.630, 0.662, 0.586, 0.664, 0.640, 0.608, 0.692, 0.632, 0.670, 0.708, 0.626, 0.682, 0.656, 0.614, 0.688, 0.608, 0.620, 0.656, 0.574, 0.648, 0.630, 0.588, 0.666, 0.606, 0.632, 0.716, 0.724, 0.882, 0.858, 0.510, 0.272, 0.146, 0.296, 0.534, 0.554, 0.648, 0.658];

var Datos11=[0.650, 0.634, 0.640, 0.642, 0.628, 0.644, 0.638, 0.628, 0.646, 0.632, 0.644, 0.660, 0.648, 0.678, 0.676, 0.664, 0.664, 0.638, 0.648, 0.656, 0.632, 0.640, 0.628, 0.618, 0.636, 0.620, 0.626, 0.636, 0.624, 0.648, 0.672, 0.744, 0.842, 0.786, 0.522, 0.282, 0.230, 0.376, 0.528, 0.608, 0.658, 0.658, 0.672, 0.684, 0.670, 0.692, 0.694, 0.686, 0.708, 0.694, 0.702, 0.716, 0.704, 0.724, 0.722, 0.714, 0.736, 0.728, 0.738, 0.752, 0.742, 0.764, 0.768, 0.764, 0.794, 0.786, 0.796, 0.812, 0.796, 0.810, 0.808, 0.794, 0.804, 0.776, 0.758, 0.752, 0.718, 0.724, 0.716, 0.696, 0.712, 0.696, 0.696, 0.708, 0.688, 0.704, 0.704, 0.692, 0.712, 0.700, 0.700, 0.714, 0.700, 0.712, 0.714, 0.706, 0.728, 0.714, 0.714, 0.730, 0.714, 0.728, 0.730, 0.716, 0.736, 0.724, 0.722, 0.732, 0.714, 0.730, 0.732, 0.718, 0.734, 0.722, 0.722, 0.736, 0.720, 0.734, 0.740, 0.734, 0.762, 0.760, 0.760, 0.766, 0.730, 0.738, 0.742, 0.722, 0.734, 0.718, 0.704, 0.718, 0.700, 0.712, 0.716, 0.696, 0.712, 0.720, 0.776, 0.882, 0.910, 0.748, 0.436, 0.266, 0.342, 0.494, 0.606, 0.676, 0.670, 0.678, 0.692, 0.678, 0.696, 0.688, 0.678, 0.692, 0.674, 0.680, 0.684, 0.660, 0.676, 0.668, 0.654, 0.666, 0.652, 0.656, 0.660, 0.644, 0.658, 0.656, 0.648, 0.664, 0.646, 0.650, 0.658, 0.636, 0.646, 0.630, 0.610, 0.618, 0.580, 0.558, 0.542, 0.502, 0.494, 0.472, 0.444, 0.448, 0.426, 0.420, 0.422, 0.398, 0.406, 0.398, 0.382, 0.396, 0.374, 0.374, 0.384, 0.358, 0.372, 0.366, 0.354, 0.374, 0.354, 0.356, 0.368, 0.344, 0.360, 0.358, 0.344, 0.364, 0.348, 0.344, 0.356, 0.338, 0.350, 0.348, 0.330, 0.346, 0.340, 0.344, 0.362, 0.338, 0.362, 0.378, 0.372, 0.392, 0.372, 0.360, 0.376, 0.354, 0.362, 0.362, 0.340, 0.350, 0.338, 0.342, 0.366, 0.342, 0.352, 0.362, 0.376, 0.482, 0.574, 0.564, 0.320, 0.000, 0.000, 0.000, 0.148, 0.334, 0.378, 0.380, 0.406, 0.392, 0.412, 0.424, 0.410, 0.438, 0.432, 0.432, 0.460, 0.450, 0.472, 0.486, 0.468, 0.500, 0.498, 0.492, 0.516, 0.506, 0.524, 0.546, 0.534, 0.566, 0.568, 0.570, 0.600, 0.584, 0.602, 0.618, 0.594, 0.616, 0.602, 0.580, 0.582, 0.546, 0.546, 0.548, 0.522, 0.540, 0.526, 0.506, 0.532, 0.514, 0.530, 0.544, 0.522, 0.550, 0.550];

var muerte1 =[  0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500];

var muerte2=[0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500];

var muerte3=[ 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500, 0.500];

Neurona.train([
     {input:Datos1 , output: {Sano : 1}},
     {input:Datos2 , output: {Sano: 1}},
     {input:Datos3 , output: {Sano: 1}},
     {input:Datos4 , output: {Sano: 1}},
     {input:Datos5 , output: {Sano: 1}},
     {input:Datos6 , output: {Sano: 1}},
     {input:Datos7 , output: {Sano: 1}},
     {input:Datos8 , output: {Sano: 1}},
     {input:Datos9 , output: {Sano: 1}},
     {input:Datos10 , output: {Sano: 1}},
     {input:Datos11 , output: {Sano: 1}},
     {input:muerte1 , output: {muerto: 1}},
     {input:muerte2 , output: {muerto: 1}},
     {input:muerte3 , output: {muerto: 1}}
   ]);

port.on('data', function(data) {
//  console.log("Valor 1 " + Sensor1 + " Valor 2 " + Sensor2);
  for (var i = 0; i < data.length; i++) {
    switch (Estado) {
      case 0:
        if (data[i] == 97) {
          Estado = 1;
          Sensor1Tmp = 0;

        } else if (data[i] == 100) {
          Estado = 2;
          Sensor2Tmp = 0;
        }
        break;
      case 1:
        if (data[i] == 99) {
          Sensor1 = Sensor1Tmp;
          Datosguardados[Contador] = Sensor1 / 500;
          Datosguardados[Contador] = Datosguardados[Contador].toFixed(3);
          Contador++ ;
          if (Contador> CantidadDatos)
           {
             var Salida = Neurona.run(Datosguardados);
             console.log("El Valor de Sano es:"+ Salida.Sano);
             console.log("El valor de muerto es" + Salida.muerto);
             if (Salida.Sano>0.5) {
               console.log("Esta Sano");

             }
             else if (Salida.muerto>0.5) {
               console.log("Esta Muerto");
             } else {
               console.log("No se sabe");
             }
            Textosnumeros = '';
            for (var i = 0; i < Datosguardados.length; i++) {
              Textosnumeros= Textosnumeros+', '+Datosguardados[i];
            }
            console.log(Textosnumeros);
            Contador = 0;
            Estado = 0;
          }else {

          Estado = 0;
          }

          //console.log("El Valor es:" + Sensor1);
        } else {
          Sensor1Tmp = Sensor1Tmp * 10 + data[i];
        }
        break;
      case 2:
        if (data[i] == 101) {
          Sensor2 = Sensor2Tmp;
          Estado = 0;
          //console.log("El Valor es:" + Sensor1);
        } else {
          Sensor2Tmp = Sensor2Tmp * 10 + data[i];
        }
        break;
    }
  }
});
