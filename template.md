<h2>Hello <span>&#128075;</span></h2>

<p>You can find the following topics in my repos.</p>

<p align="center">
{% for badge in badges %}
  <img alt="{{ badge.alt }}" src="{{ badge.src }}"/>
{% endfor %}
</p>

<p align="center">This <i>README</i> is auto-generated!<br>Last update: {{ date }}</p>
<p align="center"><img alt="build passing badge" src="https://github.com/willemverbuyst/willemverbuyst/actions/workflows/generate_README.yml/badge.svg" /></p>
