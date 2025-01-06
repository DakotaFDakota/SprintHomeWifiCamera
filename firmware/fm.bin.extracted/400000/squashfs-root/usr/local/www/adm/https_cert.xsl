<?xml version="1.0" encoding="ISO-8859-1"?><!-- DWXMLSource="file:///D|/https_cert.xml" -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <html>
  <head>
  <link rel="stylesheet" type="text/css" href="../rc8510a_ig_n.css" />
  <script language="JavaScript" type="text/javascript">
  function init()
  {
	  document.getElementById("box1").value = document.getElementById("box1").value.replace(/:/g, " ");
      document.getElementById("box1").style.height = (document.getElementById("box1").scrollHeight + 10) + "px";
  	  document.getElementById("box2").value = document.getElementById("box2").value.replace(/:/g, " ");
      document.getElementById("box2").style.height = (document.getElementById("box2").scrollHeight + 10) + "px";
      document.getElementById("box3").style.height = (document.getElementById("box3").scrollHeight + 10) + "px";
  }
  </script>
  </head>
  <body onload="init();">
    <table class="maintab2" style="width:500px;">
    <tr><td width="6px"><xsl:text disable-output-escaping="yes"></xsl:text></td>
    <td>
   	<table>
        <tr>  <!-- layout row, do not delete -->
            <td style="width:150px;"><xsl:text disable-output-escaping="yes"> </xsl:text></td>
            <td> </td>
        </tr>
        <tr>
           <td class="subhead" colspan="2" >Certificate Details</td>
        </tr>
        <tr>
           <td><b>Version: </b></td><td><xsl:value-of select="cert/version"/></td>
        </tr>
        <tr>
           <td><b>Serial Number: </b></td><td><xsl:value-of select="cert/serial"/></td>
        </tr>
        <tr>
           <td><b>Signature Algorithm: </b></td><td><xsl:value-of select="cert/signature-algorithm"/></td>
        </tr>
        <tr>
           <td><b>Issuer: </b></td><td><xsl:value-of select="cert/issuer"/></td>
        </tr>
        <tr>
           <td><b>Valid From: </b></td><td><xsl:value-of select="cert/validity/valid-from"/></td>
        </tr>
        <tr>
           <td><b>Valid To: </b></td><td><xsl:value-of select="cert/validity/valid-to"/></td>
        </tr>
        <tr>
           <td><b>Subject: </b></td><td><xsl:value-of select="cert/subject"/></td>
        </tr>
        <tr>
           <td><b>Algorithm: </b></td><td><xsl:value-of select="cert/public-key/algorithm"/></td>
        </tr>
        <tr>  <!-- layout row, do not delete -->
            <td><xsl:text disable-output-escaping="yes"> </xsl:text></td>
            <td><xsl:text> </xsl:text></td>
        </tr>
        <tr>
           <td><b>Modulus: </b></td></tr><tr><td colspan="2">
           <textarea readonly="1" id="box1" style="width:460px; overflow:hidden; border: dotted #666 1px; color:#333; background-color:#EBEBEB; font-size:12px">
           <xsl:value-of select="cert/public-key/modulus"/>
           </textarea></td>
        </tr>
        <tr>  <!-- layout row, do not delete -->
            <td><xsl:text disable-output-escaping="yes"> </xsl:text></td>
            <td><xsl:text> </xsl:text></td>
        </tr>
        <tr>
           <td><b>Signature: </b></td></tr><tr><td colspan="2">
           <textarea readonly="1" id="box2" style="width:460px; overflow:hidden; border:dotted #666 1px; color:#333; background-color:#EBEBEB; font-size:12px">
           <xsl:value-of select="cert/signature"/></textarea></td>
        </tr>
        <tr>  <!-- layout row, do not delete -->
            <td><xsl:text disable-output-escaping="yes"> </xsl:text></td>
            <td><xsl:text> </xsl:text></td>
        </tr>
        <tr>
           <td><b>PEM format: </b></td></tr><tr><td colspan="2">
           <textarea readonly="1" id="box3" style="width:460px; overflow:hidden; border:dotted #666 1px; color:#333; background-color:#EBEBEB; font-size:12px">
           <xsl:value-of select="cert/pem-cert"/></textarea></td>
        </tr>
        <tr>
        	<td align="middle" colspan="2"><input type="button" onClick="window.close();" value=" Close "></input></td>
		</tr>
        <tr>  <!-- layout row, do not delete -->
            <td><xsl:text disable-output-escaping="yes"> </xsl:text></td>
            <td><xsl:text> </xsl:text></td>
        </tr> 

    </table>
    </td>
    </tr>
    </table>
  </body>
  </html>
</xsl:template>

</xsl:stylesheet>
