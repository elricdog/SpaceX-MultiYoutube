<html>
<head>
<style>

.floating-form {
  width: 320px;
}

.floating-label {
  position: relative;
  margin-bottom: 1px;
}

.floating-input,
.floating-select {
  font-size: 12px;
  padding: 0px 0px;
  display: block;
  width: 100%;
  height: 30px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #757575;
}

.floating-input:focus,
.floating-select:focus {
  outline: none;
  border-bottom: 2px solid #5264AE;
}

/* active state */

.floating-input:focus~.bar:before,
.floating-input:focus~.bar:after,
.floating-select:focus~.bar:before,
.floating-select:focus~.bar:after {
  width: 50%;
}

*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.floating-textarea {
  min-height: 30px;
  max-height: 260px;
  overflow: hidden;
  overflow-x: hidden;
}


/* highlighter */

.highlight {
  position: absolute;
  height: 50%;
  width: 100%;
  top: 15%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}


/* active state */

.floating-input:focus~.highlight,
.floating-select:focus~.highlight {
  -webkit-animation: inputHighlighter 0.3s ease;
  -moz-animation: inputHighlighter 0.3s ease;
  animation: inputHighlighter 0.3s ease;
}


/* animation */

@-webkit-keyframes inputHighlighter {
  from {
    background: #5264AE;
  }
  to {
    width: 0;
    background: transparent;
  }
}

@-moz-keyframes inputHighlighter {
  from {
    background: #5264AE;
  }
  to {
    width: 0;
    background: transparent;
  }
}

@keyframes inputHighlighter {
  from {
    background: #5264AE;
  }
  to {
    width: 0;
    background: transparent;
  }
}

.row {
    display: table-row;
    border: 0px;
}
.last
{
    height: 50%;
}
</style>
</head>
<body>

<?php

$channels = [
 "Select one channel" => "",
 "SpaceFlight" => "lPRfJxz-ECE?autoplay=1&mute=0",
 "NSF Fleet Cam" => "gnt2wZBg89g?autoplay=1&mute=1",
 "Lab Padre - Nerdle Cam 4K" => "Ky5l9ZxsG9M?autoplay=1&mute=1",
 "Lab Padre - Sapphire Cam" => "dROdPn9Tpxg?autoplay=1&mute=1",
 "Lab Padre - South Padre Island Pearl Beach Cam" => "agmFDeP5u_w?autoplay=1&mute=1",
 "Lab Padre - Predator Cam" => "lTJ9OgcIMSs?autoplay=1&mute=1",
 "Lab Padre - Lab Cam" => "hpqoqJxbNpw?autoplay=1&mute=1",
 "Lab Padre - Launch Pad Cam" => "Z72Au8Px7mM?autoplay=1&mute=1",
 "Lab Padre - Sentinel Cam" => "n5ozYnVQahE?autoplay=1&mute=1", 
 "Every Day Astronaut" => "NtGutb1R5cQ?autoplay=1&mute=0",
 "SpaceX Storm (Spanish)" => "aFEnSXUqXdE?autoplay=1&mute=0",
 "SpaceX Feed" => "_qwLHlVjRyw?autoplay=1&mute=0",
];

?>

<table style="width:100%;height:100%;">
<tr class="row">
<td>
	<div class="floating-form">
		<div class="floating-label">
		  <select id="ch1" class="floating-select" onclick="this.setAttribute('value', this.value);" onchange="document.getElementById('iframeCH1').src = this.options[this.selectedIndex].value" value="">
		  <?php foreach ($channels as $key => $value) echo "<option value='https://www.youtube.com/embed/" . $value . "'>" . $key . "</option>"; ?>
		  </select>		  
		</div>
	<div>
</td>
<td>
	<div class="floating-form">
		<div class="floating-label">
		  <select id="ch2" class="floating-select" onclick="this.setAttribute('value', this.value);" onchange="document.getElementById('iframeCH2').src = this.options[this.selectedIndex].value" value="">
			<?php foreach ($channels as $key => $value) echo "<option value='https://www.youtube.com/embed/" . $value . "'>" . $key . "</option>"; ?>
		  </select>		  
		</div>
	<div>
</td>
</tr>

<tr class="row last">
<td>
<iframe id="iframeCH1" style="position: relative; height: 100%; width: 100%;" src="https://www.youtube.com/embed/lPRfJxz-ECE?autoplay=1&mute=0" scrolling="no" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</td>
<td>
<iframe id="iframeCH2" style="position: relative; height: 100%; width: 100%;" src="https://www.youtube.com/embed/hpqoqJxbNpw?autoplay=1&mute=1" scrolling="no" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</td>
</tr>

<tr class="row">
<td>
	<div class="floating-form">
		<div class="floating-label">
		  <select id="ch3" class="floating-select" onclick="this.setAttribute('value', this.value);" onchange="document.getElementById('iframeCH3').src = this.options[this.selectedIndex].value" value="">
			<?php foreach ($channels as $key => $value) echo "<option value='https://www.youtube.com/embed/" . $value . "'>" . $key . "</option>"; ?>
		  </select>		  
		</div>
	<div>
</td>
<td>
	<div class="floating-form">
		<div class="floating-label">
		  <select name="ch4" class="floating-select" onclick="this.setAttribute('value', this.value);" onchange="document.getElementById('iframeCH4').src = this.options[this.selectedIndex].value" value="">
			<?php foreach ($channels as $key => $value) echo "<option value='https://www.youtube.com/embed/" . $value . "'>" . $key . "</option>"; ?>
		  </select>		  
		</div>
	<div>
</td>
</tr>

<tr class="row last">
<td>
<iframe id="iframeCH3" style="position: relative; height: 100%; width: 100%;" src="https://www.youtube.com/embed/Z72Au8Px7mM?autoplay=1&mute=1" scrolling="no" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</td>
<td>
<iframe id="iframeCH4" style="position: relative; height: 100%; width: 100%;" src="https://www.youtube.com/embed/n5ozYnVQahE?autoplay=1&mute=1" scrolling="no" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</td>
</tr>
</table>

</div>
</body>
</html>